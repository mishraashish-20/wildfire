import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserRole } from '../auth/auth.types';
import { AuthGuard, Roles, RolesGuard, authUser } from '../auth/auth.guards';
import { PostsService } from '../posts/posts.service';
import { ReportsService } from '../reports/reports.service';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { moderationDecisionSchema } from '../common/schemas';
import { ok } from '../common/api';

@Controller('api/v1/moderation')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.MODERATOR, UserRole.ADMIN)
export class ModerationController {
  constructor(private readonly posts: PostsService, private readonly reports: ReportsService) {}

  @Get('posts/pending')
  async pending() { return ok(await this.posts.pending()); }

  @Post('posts/:postId/decision')
  async postDecision(@Param('postId') id: string, @Body(new ZodValidationPipe(moderationDecisionSchema)) body: any) {
    return ok(await this.posts.moderate(id, body.action, body.reviewerNote));
  }

  @Get('reports')
  async reportsList() { return ok(await this.reports.listOpen()); }

  @Post('reports/:reportId/decision')
  async reportDecision(@Param('reportId') id: string, @Body(new ZodValidationPipe(moderationDecisionSchema)) body: any, @Req() req: Request) {
    return ok(await this.reports.review(id, body.action, body.reviewerNote, authUser(req)));
  }
}
