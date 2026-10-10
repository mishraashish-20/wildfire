import { DataSource } from 'typeorm';
import { AuthenticatedUser } from '../auth/auth.types';
export declare class CommentsService {
    private readonly db;
    constructor(db: DataSource);
    list(postId: string): Promise<any>;
    create(postId: string, content: string, user: AuthenticatedUser, parentId?: string | null): Promise<any>;
    reply(id: string, content: string, user: AuthenticatedUser): Promise<any>;
    update(id: string, content: string, user: AuthenticatedUser): Promise<any>;
    remove(id: string, user: AuthenticatedUser): Promise<null>;
}
