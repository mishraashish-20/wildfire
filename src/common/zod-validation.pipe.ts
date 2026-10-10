import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}
  transform(value: unknown, _metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({ path: issue.path, message: issue.message }));
      throw new BadRequestException({ error: { code: 'VALIDATION_ERROR', message: 'Request validation failed.', details: errors } });
    }
    return result.data;
  }
}
