export const ALLOWED_EMAIL_DOMAIN = "uw.edu";
export const DOMAIN_REJECTION_MESSAGE =
  "Only UW Google accounts ending in @uw.edu are allowed.";

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith(`@${ALLOWED_EMAIL_DOMAIN}`);
}
