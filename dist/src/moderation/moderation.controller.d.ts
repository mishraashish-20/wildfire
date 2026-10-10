import { Request } from 'express';
import { PostsService } from '../posts/posts.service';
import { ReportsService } from '../reports/reports.service';
export declare class ModerationController {
    private readonly posts;
    private readonly reports;
    constructor(posts: PostsService, reports: ReportsService);
    pending(): Promise<{
        data: any[];
    }>;
    postDecision(id: string, body: any): Promise<{
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
    reportsList(): Promise<{
        data: any;
    }>;
    reportDecision(id: string, body: any, req: Request): Promise<{
        data: any;
    }>;
}
