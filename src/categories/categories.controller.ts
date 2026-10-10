import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ok } from '../common/api';
@Controller('api/v1/categories')
export class CategoriesController { constructor(private readonly service: CategoriesService) {} @Get() async list() { return ok(await this.service.list()); } }
