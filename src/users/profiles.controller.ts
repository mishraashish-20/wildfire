import { Controller, Get, Param } from '@nestjs/common'; import { ProfilesService } from './profiles.service'; import { ok } from '../common/api';
@Controller('api/v1/profiles') export class ProfilesController { constructor(private readonly service: ProfilesService) {} @Get(':username') async get(@Param('username') username: string) { return ok(await this.service.get(username)); } }
