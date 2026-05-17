"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { User } from "firebase/auth";

import AuthGuard from "@/components/AuthGuard";
import { signOutCurrentUser } from "@/lib/auth";

export default function DashboardPage() {
  return (
    <AuthGuard>
      {(user) => <DashboardView user={user} />}
    </AuthGuard>
  );
}

function DashboardView({ user }: { user: User }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await signOutCurrentUser();
    router.replace("/login");
  }

  return (
    <section className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {user.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.photoURL}
              alt={user.displayName ?? user.email ?? "Profile"}
              className="h-12 w-12 rounded-full border border-gray-200"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-husky-light text-husky-purple">
              <span className="text-lg font-semibold">
                {(user.displayName ?? user.email ?? "U")[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold text-husky-purple">
              Welcome, {user.displayName ?? "Husky"}
            </h1>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          {loggingOut ? "Signing out..." : "Log out"}
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {/*
         * TODO: Wire these placeholder cards up to real features.
         * - Browse Professors: list professor docs from a future `professors` collection.
         * - Submit Review: form posting to `reviews` collection (course code,
         *   numerical ratings, would-take-again, written review, optional tags).
         * - AI Review Summaries: server route that aggregates reviews + IASystem
         *   ratings and produces a model-generated overview.
         * - IASystem Ratings: display numerical ordinal ratings per category.
         */}
        <PlaceholderCard
          title="Browse Professors"
          body="Search UW professors by name, course, or campus. Coming soon."
        />
        <PlaceholderCard
          title="Submit Review"
          body="Post a structured review with ratings, difficulty, and written feedback."
        />
        <PlaceholderCard
          title="AI Review Summaries"
          body="Skim long review threads with model-generated overviews."
        />
        <PlaceholderCard
          title="IASystem Ratings"
          body="View numerical ordinal ratings from official course evaluations."
        />
      </div>
    </section>
  );
}

function PlaceholderCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-5">
      <h3 className="font-semibold text-husky-purple">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{body}</p>
      <span className="mt-3 inline-block rounded-full bg-husky-light px-2 py-0.5 text-xs font-medium text-husky-metallic">
        Coming soon
      </span>
    </div>
  );
}
