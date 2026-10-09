import jwt, { type SignOptions } from 'jsonwebtoken';
import { z } from 'zod';
import { ROLES, type AuthPrincipal } from './types';

export interface TokenService {
  sign(principal: AuthPrincipal): string;
  /** Returns the principal for a valid token, or null for anything invalid or expired. */
  verify(token: string): AuthPrincipal | null;
  readonly expiresIn: string;
}

const principalSchema = z.object({
  sub: z.string().min(1),
  email: z.email(),
  name: z.string().min(1),
  role: z.enum(ROLES),
});

export class JwtTokenService implements TokenService {
  private static readonly ALGORITHM = 'HS256' as const;

  constructor(
    private readonly secret: string,
    readonly expiresIn: string,
    private readonly issuer = 'travel-agency-api',
  ) {}

  sign({ sub, email, name, role }: AuthPrincipal): string {
    return jwt.sign({ email, name, role }, this.secret, {
      subject: sub,
      issuer: this.issuer,
      algorithm: JwtTokenService.ALGORITHM,
      // The env schema already restricts the format to values like "1d" or "3600".
      expiresIn: this.expiresIn as NonNullable<SignOptions['expiresIn']>,
    });
  }

  verify(token: string): AuthPrincipal | null {
    try {
      const payload = jwt.verify(token, this.secret, {
        issuer: this.issuer,
        algorithms: [JwtTokenService.ALGORITHM],
      });
      if (typeof payload === 'string') return null;
      const parsed = principalSchema.safeParse(payload);
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }
}
