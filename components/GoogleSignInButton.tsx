"use client";

interface Props {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
}

export default function GoogleSignInButton({
  onClick,
  loading = false,
  disabled = false,
  label = "Sign in with Google",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <GoogleGlyph />
      <span>{loading ? "Signing in..." : label}</span>
    </button>
  );
}

function GoogleGlyph() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4818h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9086c1.7018-1.5668 2.6837-3.874 2.6837-6.6154z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.4673-.806 5.9563-2.1805l-2.9086-2.2581c-.806.54-1.8368.8595-3.0477.8595-2.344 0-4.3286-1.5832-5.0364-3.7104H.957v2.3318C2.4382 15.9831 5.4818 18 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.9636 10.71c-.18-.54-.2823-1.1168-.2823-1.71s.1023-1.17.2823-1.71V4.9582H.957C.3477 6.1732 0 7.5477 0 9c0 1.4523.3477 2.8268.957 4.0418l3.0066-2.3318z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.3463l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.957 4.9582l3.0066 2.3318C4.6714 5.1627 6.656 3.5795 9 3.5795z"
        fill="#EA4335"
      />
    </svg>
  );
}
