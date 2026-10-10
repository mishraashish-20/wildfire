import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard, authUser } from './auth.guards';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { changePasswordSchema, loginSchema, registerSchema } from '../common/schemas';
import { ok } from '../common/api';

const cookieName = () => process.env.SESSION_COOKIE_NAME || 'wildfire_session';
const cookieOptions = (expires?: Date) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  ...(expires ? { expires } : {}),
});

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  async register(@Body(new ZodValidationPipe(registerSchema)) body: any, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.register(body);
    res.cookie(cookieName(), result.token.token, cookieOptions(result.token.expiresAt));
    return ok(result.user);
  }

  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) body: any, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.login(body);
    res.cookie(cookieName(), result.token.token, cookieOptions(result.token.expiresAt));
    return ok(result.user);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.auth.revoke(this.tokenFromRequest(req));
    res.clearCookie(cookieName(), cookieOptions());
    return ok(null);
  }

  @Post('logout-all')
  @UseGuards(AuthGuard)
  async logoutAll(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.auth.revokeAll(authUser(req).id);
    res.clearCookie(cookieName(), cookieOptions());
    return ok(null);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: Request) {
    const user = authUser(req);
    return ok({ user, permissions: this.auth.permissions(user.role) });
  }

  @Get('permissions')
  @UseGuards(AuthGuard)
  permissions(@Req() req: Request) {
    const user = authUser(req);
    return ok({ role: user.role, permissions: this.auth.permissions(user.role) });
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  async changePassword(@Body(new ZodValidationPipe(changePasswordSchema)) body: any, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.auth.changePassword(authUser(req).id, body.currentPassword, body.newPassword);
    res.clearCookie(cookieName(), cookieOptions());
    return ok({ message: 'Password changed successfully. Please sign in again.' });
  }

  private tokenFromRequest(req: Request) {
    const cookieToken = req.cookies?.[cookieName()];
    if (cookieToken) return cookieToken;
    const header = req.headers.authorization;
    return header?.startsWith('Bearer ') ? header.slice(7).trim() : undefined;
  }
}
