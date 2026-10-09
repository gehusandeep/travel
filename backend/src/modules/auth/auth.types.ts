import type { Role } from '@/core/security/types';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  passwordHash: string;
}

export type PublicUser = Omit<AdminUser, 'passwordHash'>;

export interface LoginResult {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
  user: PublicUser;
}
