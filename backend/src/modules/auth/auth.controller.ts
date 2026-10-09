import type { Request, Response } from 'express';
import { sendSuccess } from '@/core/http/response';
import { getAuthUser } from '@/core/middlewares';
import { loginSchema } from './auth.schema';
import type { AuthService } from './auth.service';

export class AuthController {
  constructor(private readonly service: AuthService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const input = loginSchema.parse(req.body);
    sendSuccess(res, await this.service.login(input));
  };

  me = async (req: Request, res: Response): Promise<void> => {
    sendSuccess(res, await this.service.getProfile(getAuthUser(req)));
  };
}
