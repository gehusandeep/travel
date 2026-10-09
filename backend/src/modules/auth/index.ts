import type { AppModule } from '@/core/module';
import type { PasswordHasher } from '@/core/security/password-hasher';
import type { TokenService } from '@/core/security/token.service';
import type { AdminUserRepository } from './admin-user.repository';
import { AuthController } from './auth.controller';
import { createAuthRouter, type AuthRouteDeps } from './auth.routes';
import { AuthService } from './auth.service';

export interface AuthModuleDeps extends AuthRouteDeps {
  adminUserRepository: AdminUserRepository;
  passwordHasher: PasswordHasher;
  tokenService: TokenService;
}

export function createAuthModule({
  adminUserRepository,
  passwordHasher,
  tokenService,
  loginLimiter,
  authenticate,
}: AuthModuleDeps) {
  const service = new AuthService(adminUserRepository, passwordHasher, tokenService);
  const appModule: AppModule = {
    name: 'auth',
    basePath: '/auth',
    router: createAuthRouter(new AuthController(service), { loginLimiter, authenticate }),
  };
  return { module: appModule, service };
}

export { EnvAdminUserRepository } from './admin-user.repository';
