import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserRole, UserStatus } from '../auth/auth.types';
import { AuthGuard, Roles, RolesGuard, authUser } from '../auth/auth.guards';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { roleUpdateSchema, userStatusUpdateSchema } from '../common/schemas';
import { ok } from '../common/api';
import { AdminUsersService } from './admin-users.service';

@Controller('api/v1/admin/users')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminUsersController {
  constructor(private readonly service: AdminUsersService) {}

  @Get()
  list() { return this.service.list().then(ok); }

  @Patch(':userId/role')
  updateRole(@Param('userId') id: string, @Body(new ZodValidationPipe(roleUpdateSchema)) body: any, @Req() req: Request) {
    return this.service.updateRole(id, body.role as UserRole, authUser(req).id).then(ok);
  }

  @Patch(':userId/status')
  updateStatus(@Param('userId') id: string, @Body(new ZodValidationPipe(userStatusUpdateSchema)) body: any, @Req() req: Request) {
    return this.service.updateStatus(id, body.status as UserStatus, authUser(req).id).then(ok);
  }
}
