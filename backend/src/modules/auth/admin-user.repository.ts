import type { AdminUser } from './auth.types';

export interface AdminUserRepository {
  findByEmail(email: string): Promise<AdminUser | null>;
  findById(id: string): Promise<AdminUser | null>;
}

export interface EnvAdminConfig {
  name: string;
  email?: string;
  passwordHash?: string;
}

/**
 * A single admin account configured through environment variables.
 * Replace with a database-backed users repository when accounts are needed.
 */
export class EnvAdminUserRepository implements AdminUserRepository {
  private readonly admin: AdminUser | null;

  constructor({ name, email, passwordHash }: EnvAdminConfig) {
    this.admin =
      email && passwordHash
        ? { id: 'admin-env', name, email: email.toLowerCase(), role: 'ADMIN', passwordHash }
        : null;
  }

  get isConfigured(): boolean {
    return this.admin !== null;
  }

  async findByEmail(email: string): Promise<AdminUser | null> {
    return this.admin && this.admin.email === email.toLowerCase() ? this.admin : null;
  }

  async findById(id: string): Promise<AdminUser | null> {
    return this.admin?.id === id ? this.admin : null;
  }
}
