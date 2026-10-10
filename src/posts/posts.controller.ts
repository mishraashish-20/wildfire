import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { PostsService } from './posts.service';
import { OptionalAuthGuard, AuthGuard, authUser } from '../auth/auth.guards';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { createPostSchema, postFiltersSchema, updatePostSchema, updateSchema } from '../common/schemas';
import { ok } from '../common/api';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly posts: PostsService) {}
  @Get() async list(@Query(new ZodValidationPipe(postFiltersSchema)) query: any) { return ok(await this.posts.list(query)); }
  @Get(':slug') @UseGuards(OptionalAuthGuard) detail(@Param('slug') slug: string, @Req() req: Request) { return this.posts.findBySlug(slug, authUser(req)).then(ok); }
  @Post() @UseGuards(AuthGuard) create(@Body(new ZodValidationPipe(createPostSchema)) body: any, @Req() req: Request) { return this.posts.create(body, authUser(req)).then(ok); }
  @Patch(':postId') @UseGuards(AuthGuard) update(@Param('postId') id: string, @Body(new ZodValidationPipe(updatePostSchema)) body: any, @Req() req: Request) { return this.posts.update(id, body, authUser(req)).then(ok); }
  @Delete(':postId') @UseGuards(AuthGuard) remove(@Param('postId') id: string, @Req() req: Request) { return this.posts.delete(id, authUser(req)).then(ok); }
  @Post(':postId/updates') @UseGuards(AuthGuard) addUpdate(@Param('postId') id: string, @Body(new ZodValidationPipe(updateSchema)) body: any, @Req() req: Request) { return this.posts.addUpdate(id, body, authUser(req)).then(ok); }
}
