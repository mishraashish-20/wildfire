import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!['POST','PUT','PATCH','DELETE'].includes(req.method)) return next();
    const allowed = process.env.FRONTEND_ORIGIN;
    const origin = req.headers.origin;
    if (allowed && origin && origin !== allowed) return res.status(403).json({ error: { code: 'FORBIDDEN_ORIGIN', message: 'Request origin is not allowed.' } });
    next();
  }
}
