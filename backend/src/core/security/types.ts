export const ROLES = ['ADMIN', 'EDITOR'] as const;
export type Role = (typeof ROLES)[number];

/** Identity attached to `req.user` after a valid access token is verified. */
export interface AuthPrincipal {
  sub: string;
  email: string;
  name: string;
  role: Role;
}
