import { Request } from 'express';
import { BookmarksService } from './bookmarks.service';
export declare class BookmarksController {
    private readonly service;
    constructor(service: BookmarksService);
    list(req: Request): Promise<{
        data: {
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
        };
    }>;
    add(id: string, req: Request): Promise<{
        data: {
            postId: string;
            bookmarked: boolean;
        };
    }>;
    remove(id: string, req: Request): Promise<{
        data: {
            postId: string;
            bookmarked: boolean;
        };
    }>;
}
