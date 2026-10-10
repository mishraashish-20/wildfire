import { Module } from '@nestjs/common';
import { PostsModule } from '../posts/posts.module';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { MeController } from './me.controller';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PostsModule, AuthModule],
  controllers: [ProfilesController, MeController, AdminUsersController],
  providers: [ProfilesService, AdminUsersService],
})
export class UsersModule {}
