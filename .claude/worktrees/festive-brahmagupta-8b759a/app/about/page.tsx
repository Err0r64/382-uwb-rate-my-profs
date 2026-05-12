export default function AboutPage() {
  return (
    <article className="space-y-8">
      <header className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-husky-purple">
          About Rate My Husky
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Documentation and project notes. Replace these placeholders as the
          project matures.
        </p>
      </header>

      <Section title="Project Overview">
        <p>
          Rate My Husky is a professor review platform exclusive to verified
          University of Washington students. Authentication is restricted to
          Google accounts ending in <code>@uw.edu</code>, ensuring reviews
          originate from real Huskies.
        </p>
        <p className="mt-3">
          The MVP focuses on browsing UW Bothell professors, submitting
          structured reviews, and surfacing AI-generated summaries of both
          written feedback and IASystem ratings.
        </p>
      </Section>

      <Section title="Technical Documentation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Next.js (App Router) + React + TypeScript</li>
          <li>Tailwind CSS for styling</li>
          <li>Firebase Auth (Google provider, domain-restricted)</li>
          <li>Firestore for user profiles and (future) reviews</li>
          <li>
            Firebase Admin SDK on Next.js API routes for server-side ID token
            verification
          </li>
          <li>Netlify as the deployment target</li>
        </ul>
        <p className="mt-3">
          Future work: <code>professors</code> and <code>reviews</code>{" "}
          collections, an AI summarization endpoint, and an admin moderation
          surface.
        </p>
      </Section>

      <Section title="User Guide">
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            Go to <code>/login</code> and click <strong>Sign in with Google</strong>.
          </li>
          <li>
            Choose your UW Google account. Accounts that do not end in
            <code> @uw.edu</code> will be rejected.
          </li>
          <li>
            On successful sign-in you will land on <code>/dashboard</code>,
            where you can (soon) browse professors and submit reviews.
          </li>
          <li>Use the &quot;Log out&quot; button in the dashboard to sign out.</li>
        </ol>
      </Section>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-husky-purple">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-gray-700">
        {children}
      </div>
    </section>
  );
}
