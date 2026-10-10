import { DataSource } from 'typeorm';
import { PostsService } from '../posts/posts.service';
export declare class ProfilesService {
    private readonly db;
    private readonly posts;
    constructor(db: DataSource, posts: PostsService);
    get(username: string): Promise<{
        profile: {
            id: any;
            username: any;
            displayName: any;
            bio: any;
            avatarUrl: any;
            joinedAt: string;
            publicPostCount: any;
        };
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
}
