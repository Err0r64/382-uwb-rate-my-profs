# Rate My Husky

A verified UW-only professor review platform for University of Washington
students. Sign in is restricted to Google accounts ending in `@uw.edu`. This
repository contains the initial scaffold: authentication, route protection,
server-side ID token verification, and Firestore user records.

## 1. Project overview

- **Audience:** current UW (Seattle/Bothell/Tacoma) students.
- **Auth:** Firebase Auth with the Google provider, gated to `@uw.edu` on both
  the client and the server.
- **Data:** Firestore. The `users` collection is created on first sign-in.
  Future collections (`professors`, `reviews`) will hang off the same project.
- **Roadmap (out of scope for this scaffold):** browsing professors,
  submitting structured reviews, AI-generated review summaries, and IASystem
  numerical ratings.

## 2. Tech stack

- [Next.js](https://nextjs.org/) (App Router) + React 18 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Auth](https://firebase.google.com/docs/auth) (Google provider)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) for
  server-side ID token verification in a Next.js API route
- [Netlify](https://www.netlify.com/) for deployment via the official
  `@netlify/plugin-nextjs` runtime

## 3. Install dependencies

```bash
npm install
```

Requires Node.js 18.18+ (Next.js 14 baseline).

## 4. Configure Firebase

1. Create a Firebase project at <https://console.firebase.google.com/>.
2. **Web app:** in *Project settings → General → Your apps*, register a new
   Web app. Copy the `firebaseConfig` values — these become the
   `NEXT_PUBLIC_FIREBASE_*` environment variables.
3. **Firestore:** in the console sidebar choose *Build → Firestore Database*
   and create a database (start in production mode). The app expects a
   collection named `users` keyed by Firebase UID.
4. **Service account (Admin SDK):** go to *Project settings → Service
   accounts → Firebase Admin SDK* and click **Generate new private key**. From
   the downloaded JSON you need three fields:
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY` (keep the literal `\n`
     sequences; the app un-escapes them at startup).

## 5. Enable Google Sign-In

1. In the Firebase console, open *Build → Authentication → Sign-in method*.
2. Click **Google**, toggle **Enable**, set a support email, and save.
3. Under *Authentication → Settings → Authorized domains*, add the domains
   you will use:
   - `localhost` (already present)
   - your Netlify preview/production domain(s)
4. Optional but recommended: in Google Cloud Console under *APIs & Services →
   OAuth consent screen*, restrict the app's user type so only the intended
   Google identities can complete the flow.

> **Note:** the `hd=uw.edu` hint set in `lib/firebaseClient.ts` is a UX hint
> only. It does **not** enforce the domain restriction — that is enforced by
> the server route described below.

## 6. Set environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Required keys (all defined in `.env.local.example`):

| Variable | Where it comes from |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Web app config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Web app config |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Web app config |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Web app config |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Web app config |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Web app config |
| `FIREBASE_ADMIN_PROJECT_ID` | Service account JSON |
| `FIREBASE_ADMIN_CLIENT_EMAIL` | Service account JSON |
| `FIREBASE_ADMIN_PRIVATE_KEY` | Service account JSON (keep literal `\n`) |

Never commit `.env.local`. The `.gitignore` already excludes it.

## 7. How the @uw.edu restriction works

Domain enforcement happens in two layers; both must pass:

1. **Client-side (UX):** after the Google popup completes,
   [`lib/auth.ts`](lib/auth.ts) checks `user.email.endsWith("@uw.edu")`. A
   non-matching account is immediately signed out and the user sees:
   *"Only UW Google accounts ending in @uw.edu are allowed."*
2. **Server-side (source of truth):** the client sends the freshly-minted
   Firebase ID token to [`app/api/auth/verify/route.ts`](app/api/auth/verify/route.ts).
   That route:
   - calls `adminAuth.verifyIdToken(token, /* checkRevoked */ true)`
   - confirms `email_verified === true`
   - confirms the decoded email ends with `@uw.edu`
   - revokes refresh tokens for any rejected user
   - upserts the user document via [`lib/firestore.ts`](lib/firestore.ts):
     `uid`, `email`, `displayName`, `photoURL`, `createdAt`,
     and `lastLoginAt` (refreshed on every sign-in).

Because the Admin SDK runs only on the server and uses a service-account
credential, the client cannot bypass this check by forging requests.

> **Recommended next step:** add Firestore Security Rules that require
> `request.auth.token.email.matches('.*@uw[.]edu$')` for any read or write.
> Rules are out of scope for this scaffold but should land before production.

## 8. Run locally

```bash
npm run dev
```

Open <http://localhost:3000>. Useful routes:

- `/` — landing page
- `/login` — Google Sign-In
- `/dashboard` — protected; redirects to `/login` if signed out
- `/about` — placeholder docs (overview / technical / user guide)

Type-check without building:

```bash
npm run typecheck
```

## 9. Deploy to Netlify

1. Push this repo to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and
   connect the GitHub repository.
3. Netlify auto-detects Next.js via [`netlify.toml`](netlify.toml) and the
   `@netlify/plugin-nextjs` runtime — no manual build settings needed.
4. Add every variable from `.env.local.example` to *Site settings → Build &
   deploy → Environment*. For `FIREBASE_ADMIN_PRIVATE_KEY`, paste the value
   including the literal `\n` sequences exactly as it appears in the service
   account JSON.
5. Trigger a deploy. Once live, add the Netlify domain (and any custom
   domain) to the Firebase *Authorized domains* list so Google Sign-In is
   permitted from production.

## Project layout

```
app/
  page.tsx                  # / landing
  login/page.tsx            # /login
  dashboard/page.tsx        # /dashboard (protected)
  about/page.tsx            # /about
  api/auth/verify/route.ts  # server-side ID token verification
components/
  Navbar.tsx
  AuthGuard.tsx
  GoogleSignInButton.tsx
lib/
  firebaseClient.ts         # browser-side Firebase init
  firebaseAdmin.ts          # server-only Admin SDK init
  auth.ts                   # sign-in / sign-out / subscription helpers
  firestore.ts              # users-collection upsert
```

## License

TBD — academic project for UW CSS 382.
