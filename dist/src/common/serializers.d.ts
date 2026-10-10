export declare function publicProfile(user: any, count?: number): {
    id: any;
    username: any;
    displayName: any;
    bio: any;
    avatarUrl: any;
    joinedAt: any;
    publicPostCount: number;
} | null;
export declare function publicComment(comment: any): {
    id: any;
    postId: any;
    parentId: any;
    content: any;
    createdAt: any;
    updatedAt: any;
    author: {
        id: any;
        username: any;
        displayName: any;
        bio: any;
        avatarUrl: any;
        joinedAt: any;
        publicPostCount: number;
    } | null;
};
export declare function publicPost(post: any): {
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
};
