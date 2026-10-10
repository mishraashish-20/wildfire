import { Request } from 'express';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly posts;
    constructor(posts: PostsService);
    list(query: any): Promise<{
        data: any[];
    }>;
    detail(slug: string, req: Request): Promise<{
        data: {
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
        } | null;
    }>;
    create(body: any, req: Request): Promise<{
        data: {
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
        } | null;
    }>;
    update(id: string, body: any, req: Request): Promise<{
        data: {
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
        } | null;
    }>;
    remove(id: string, req: Request): Promise<{
        data: null;
    }>;
    addUpdate(id: string, body: any, req: Request): Promise<{
        data: {
            id: any;
            title: any;
            content: any;
            lifecycleStatus: any;
            createdAt: string;
            media: any;
        };
    }>;
}
