import { NextResponse, type NextRequest } from "next/server";

import { adminAuth } from "@/lib/firebaseAdmin";
import { ALLOWED_EMAIL_DOMAIN, DOMAIN_REJECTION_MESSAGE } from "@/lib/auth";
import { upsertUserOnSignIn } from "@/lib/firestore";

// Force the Node.js runtime — firebase-admin uses Node-only modules and
// cannot run on the Edge runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function extractBearerToken(req: NextRequest): string | null {
  const header = req.headers.get("authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

export async function POST(req: NextRequest) {
  const idToken = extractBearerToken(req);
  if (!idToken) {
    return NextResponse.json(
      { error: "Missing Authorization bearer token." },
      { status: 401 },
    );
  }

  let decoded;
  try {
    // checkRevoked=true so a forcibly signed-out user can't replay an old token.
    decoded = await adminAuth.verifyIdToken(idToken, true);
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired ID token." },
      { status: 401 },
    );
  }

  const email = decoded.email?.toLowerCase() ?? "";
  const emailVerified = decoded.email_verified === true;

  if (!emailVerified || !email.endsWith(`@${ALLOWED_EMAIL_DOMAIN}`)) {
    // Best-effort: revoke refresh tokens so the client can't keep using this session.
    try {
      await adminAuth.revokeRefreshTokens(decoded.uid);
    } catch {
      // ignore — surface the rejection regardless
    }
    return NextResponse.json(
      { error: DOMAIN_REJECTION_MESSAGE },
      { status: 403 },
    );
  }

  try {
    await upsertUserOnSignIn({
      uid: decoded.uid,
      email,
      displayName: decoded.name ?? null,
      photoURL: decoded.picture ?? null,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to persist user.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    uid: decoded.uid,
    email,
  });
}
