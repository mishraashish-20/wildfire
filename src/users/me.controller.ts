import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard, authUser } from '../auth/auth.guards';
import { PostsService } from '../posts/posts.service';
import { ok } from '../common/api';
@Controller('api/v1/me')
@UseGuards(AuthGuard)
export class MeController { constructor(private readonly posts: PostsService) {} @Get('posts') async postsList(@Req() req:Request){ return ok(await this.posts.myPosts(authUser(req))); } }
