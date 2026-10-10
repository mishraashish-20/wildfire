import { Module } from '@nestjs/common'; import { ModerationController } from './moderation.controller'; import { PostsModule } from '../posts/posts.module'; import { ReportsModule } from '../reports/reports.module';
@Module({imports:[PostsModule,ReportsModule],controllers:[ModerationController]}) export class ModerationModule{}
