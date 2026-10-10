import { DataSource } from 'typeorm';
import { AuthenticatedUser } from '../auth/auth.types';
import { PostsService } from '../posts/posts.service';
export declare class BookmarksService {
    private readonly db;
    private readonly posts;
    constructor(db: DataSource, posts: PostsService);
    list(user: AuthenticatedUser): Promise<{
        postIds: string[];
        posts: ({
            id: any;
            slug: any;
            authorVisibility: any;
            title: any;
            summary: any;
            body: any;
            category: any;
            publicationStatus: any;
            lifecycleStatus: any;
            location: {
                latitude: number | null;
                longitude: number | null;
                locality: any;
                city: any;
                state: any;
                country: any;
                precision: any;
            } | null;
            media: any;
            incidentDate: any;
            createdAt: any;
            updatedAt: any;
            commentCount: any;
            bookmarkCount: any;
            shareCount: number;
            updates: any;
            author: {
                id: any;
                username: any;
                displayName: any;
                bio: any;
                avatarUrl: any;
                joinedAt: any;
                publicPostCount: number;
            } | null;
        } | null)[];
    }>;
    add(id: string, user: AuthenticatedUser): Promise<{
        postId: string;
        bookmarked: boolean;
    }>;
    remove(id: string, user: AuthenticatedUser): Promise<{
        postId: string;
        bookmarked: boolean;
    }>;
}
