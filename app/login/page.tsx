"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import GoogleSignInButton from "@/components/GoogleSignInButton";
import {
  isAllowedEmail,
  signInWithGoogle,
  signOutCurrentUser,
  subscribeToAuth,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeToAuth(async (u) => {
      if (u && isAllowedEmail(u.email)) {
        router.replace("/dashboard");
        return;
      }
      if (u && !isAllowedEmail(u.email)) {
        await signOutCurrentUser();
      }
      setChecking(false);
    });
    return () => unsub();
  }, [router]);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    const result = await signInWithGoogle();
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.replace("/dashboard");
  }

  return (
    <section className="mx-auto max-w-md">
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-husky-purple">Sign in</h1>
        <p className="mt-2 text-sm text-gray-600">
          Rate My Husky is restricted to current UW students. Use the Google
          account associated with your <strong>@uw.edu</strong> address.
        </p>

        <div className="mt-6">
          {checking ? (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span
                aria-hidden="true"
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-husky-purple border-t-transparent"
              />
              Checking session...
            </div>
          ) : (
            <GoogleSignInButton onClick={handleSignIn} loading={loading} />
          )}
        </div>

        {error ? (
          <div
            role="alert"
            className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </div>
        ) : null}

        <p className="mt-6 text-xs text-gray-500">
          By signing in, you agree that reviews you post can be moderated and
          that misuse may be reported to UW per university policy.
        </p>
      </div>
    </section>
  );
}
