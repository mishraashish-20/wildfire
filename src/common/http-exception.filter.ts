import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body: any = exception.getResponse();
      if (body?.error?.code) return response.status(status).json(body);
      if (body?.message) return response.status(status).json({ error: { code: status === 400 ? 'BAD_REQUEST' : 'HTTP_ERROR', message: Array.isArray(body.message) ? body.message.join('; ') : body.message } });
      return response.status(status).json({ error: { code: 'HTTP_ERROR', message: 'Request failed.' } });
    }
    console.error(`[${request.method}] ${request.url}`, exception);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' } });
  }
}
