import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private readonly schema;
    constructor(schema: ZodType);
    transform(value: unknown, _metadata: ArgumentMetadata): unknown;
}
