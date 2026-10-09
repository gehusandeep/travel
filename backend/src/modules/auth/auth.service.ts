import { randomUUID } from 'node:crypto';
import { UnauthorizedError } from '@/core/errors';
import type { PasswordHasher } from '@/core/security/password-hasher';
import type { TokenService } from '@/core/security/token.service';
import type { AuthPrincipal } from '@/core/security/types';
import type { AdminUserRepository } from './admin-user.repository';
import type { LoginInput } from './auth.schema';
import type { AdminUser, LoginResult, PublicUser } from './auth.types';

const toPublicUser = ({ id, name, email, role }: AdminUser): PublicUser => ({ id, name, email, role });

export class AuthService {
  private dummyHash?: Promise<string>;

  constructor(
    private readonly users: AdminUserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async login({ email, password }: LoginInput): Promise<LoginResult> {
    const user = await this.users.findByEmail(email);

    // Always run a bcrypt comparison so response times do not reveal which emails exist.
    const hash = user?.passwordHash ?? (await this.getDummyHash());
    const passwordMatches = await this.hasher.compare(password, hash);

    if (!user || !passwordMatches) throw new UnauthorizedError('Invalid email or password');

    const principal: AuthPrincipal = { sub: user.id, email: user.email, name: user.name, role: user.role };
    return {
      accessToken: this.tokens.sign(principal),
      tokenType: 'Bearer',
      expiresIn: this.tokens.expiresIn,
      user: toPublicUser(user),
    };
  }

  async getProfile(principal: AuthPrincipal): Promise<PublicUser> {
    const user = await this.users.findById(principal.sub);
    if (!user) throw new UnauthorizedError();
    return toPublicUser(user);
  }

  private getDummyHash(): Promise<string> {
    this.dummyHash ??= this.hasher.hash(randomUUID());
    return this.dummyHash;
  }
}
