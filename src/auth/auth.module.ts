import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OptionalAuthGuard, AuthGuard, RolesGuard } from './auth.guards';

@Module({
  controllers: [AuthController],
  providers: [AuthService, OptionalAuthGuard, AuthGuard, RolesGuard],
  exports: [AuthService, OptionalAuthGuard, AuthGuard, RolesGuard],
})
export class AuthModule {}
