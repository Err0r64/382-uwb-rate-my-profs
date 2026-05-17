import { FieldValue } from "firebase-admin/firestore";

import { adminDb } from "./firebaseAdmin";

export const USERS_COLLECTION = "users";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

/**
 * Server-side: create the user document on first sign-in, or refresh
 * lastLoginAt on subsequent sign-ins. Uses the Firebase UID as the doc ID.
 *
 * NOTE: Professor profile and review collections should be added alongside
 * this users collection in future iterations (e.g. `professors`, `reviews`).
 */
export async function upsertUserOnSignIn(profile: UserProfile): Promise<void> {
  const ref = adminDb.collection(USERS_COLLECTION).doc(profile.uid);
  const snap = await ref.get();

  const now = FieldValue.serverTimestamp();

  if (!snap.exists) {
    await ref.set({
      uid: profile.uid,
      email: profile.email,
      displayName: profile.displayName,
      photoURL: profile.photoURL,
      createdAt: now,
      lastLoginAt: now,
    });
    return;
  }

  await ref.update({
    email: profile.email,
    displayName: profile.displayName,
    photoURL: profile.photoURL,
    lastLoginAt: now,
  });
}
