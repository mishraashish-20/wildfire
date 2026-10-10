import { HttpException, HttpStatus } from '@nestjs/common';

export type ApiErrorBody = { error: { code: string; message: string; details?: unknown } };
export function ok<T>(data: T) { return { data }; }
export function fail(code: string, message: string, status: HttpStatus = HttpStatus.BAD_REQUEST, details?: unknown): never {
  throw new HttpException({ error: { code, message, ...(details === undefined ? {} : { details }) } }, status);
}
