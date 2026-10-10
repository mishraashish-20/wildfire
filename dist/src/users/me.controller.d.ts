import { Request } from 'express';
import { PostsService } from '../posts/posts.service';
export declare class MeController {
    private readonly posts;
    constructor(posts: PostsService);
    postsList(req: Request): Promise<{
        data: any[];
    }>;
}
