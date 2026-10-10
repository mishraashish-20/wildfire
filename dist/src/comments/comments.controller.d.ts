import { Request } from 'express';
import { CommentsService } from './comments.service';
export declare class CommentsController {
    private readonly service;
    constructor(service: CommentsService);
    list(id: string): Promise<{
        data: any;
    }>;
    create(id: string, body: any, req: Request): Promise<{
        data: any;
    }>;
    reply(id: string, body: any, req: Request): Promise<{
        data: any;
    }>;
    update(id: string, body: any, req: Request): Promise<{
        data: any;
    }>;
    remove(id: string, req: Request): Promise<{
        data: null;
    }>;
}
