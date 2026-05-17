import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

import { auth, googleProvider } from "./firebaseClient";

export const ALLOWED_EMAIL_DOMAIN = "uw.edu";
export const DOMAIN_REJECTION_MESSAGE =
  "Only UW Google accounts ending in @uw.edu are allowed.";

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith(`@${ALLOWED_EMAIL_DOMAIN}`);
}

export type AuthResult =
  | { ok: true; user: User }
  | { ok: false; error: string };

/**
 * Trigger the Google Sign-In popup, validate the email domain on the client,
 * then call the server-side verification route to confirm the ID token and
 * persist the user record in Firestore.
 *
 * Client-side checks are a UX nicety; the server route is the source of truth.
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (!isAllowedEmail(user.email)) {
      await signOut(auth);
      return { ok: false, error: DOMAIN_REJECTION_MESSAGE };
    }

    const idToken = await user.getIdToken(/* forceRefresh */ true);

    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      await signOut(auth);
      return {
        ok: false,
        error: body?.error ?? "Server-side verification failed.",
      };
    }

    return { ok: true, user };
  } catch (err) {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    const message =
      err instanceof Error ? err.message : "Unexpected sign-in error.";
    return { ok: false, error: message };
  }
}

export async function signOutCurrentUser(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuth(
  cb: (user: User | null) => void,
): () => void {
  return onAuthStateChanged(auth, cb);
}
