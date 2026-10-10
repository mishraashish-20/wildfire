import { HttpStatus } from '@nestjs/common';
export type ApiErrorBody = {
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
};
export declare function ok<T>(data: T): {
    data: T;
};
export declare function fail(code: string, message: string, status?: HttpStatus, details?: unknown): never;
