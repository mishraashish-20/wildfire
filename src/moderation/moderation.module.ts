import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ModerationController } from './moderation.controller';
import { PostsModule } from '../posts/posts.module';
import { ReportsService } from '../reports/reports.service';

@Module({
  imports: [AuthModule,PostsModule],
  controllers: [ModerationController],
  providers:[ReportsService]
})
export class ModerationModule { }