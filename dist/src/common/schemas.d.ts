import { z } from 'zod';
export declare const mediaSchema: z.ZodObject<{
    type: z.ZodEnum<{
        IMAGE: "IMAGE";
        VIDEO: "VIDEO";
        YOUTUBE: "YOUTUBE";
    }>;
    url: z.ZodString;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
    alt: z.ZodString;
    position: z.ZodNumber;
}, z.core.$strip>;
export declare const locationSchema: z.ZodObject<{
    country: z.ZodString;
    state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    locality: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    precision: z.ZodEnum<{
        HIDDEN: "HIDDEN";
        LOCALITY: "LOCALITY";
        EXACT: "EXACT";
        CITY: "CITY";
    }>;
}, z.core.$strip>;
export declare const registerSchema: z.ZodObject<{
    mobile: z.ZodString;
    password: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
    displayName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    mobile: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const changePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const roleUpdateSchema: z.ZodObject<{
    role: z.ZodEnum<{
        USER: "USER";
        MODERATOR: "MODERATOR";
        ADMIN: "ADMIN";
    }>;
}, z.core.$strip>;
export declare const userStatusUpdateSchema: z.ZodObject<{
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        DELETED: "DELETED";
    }>;
}, z.core.$strip>;
export declare const createPostSchema: z.ZodObject<{
    title: z.ZodString;
    summary: z.ZodString;
    body: z.ZodString;
    category: z.ZodString;
    lifecycleStatus: z.ZodEnum<{
        NEW: "NEW";
        DEVELOPING: "DEVELOPING";
        ONGOING: "ONGOING";
        RESOLVED: "RESOLVED";
    }>;
    authorVisibility: z.ZodEnum<{
        ANONYMOUS: "ANONYMOUS";
        PUBLIC: "PUBLIC";
    }>;
    publicationStatus: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PENDING_REVIEW: "PENDING_REVIEW";
        PUBLISHED: "PUBLISHED";
    }>>;
    incidentDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        country: z.ZodString;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        locality: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        precision: z.ZodEnum<{
            HIDDEN: "HIDDEN";
            LOCALITY: "LOCALITY";
            EXACT: "EXACT";
            CITY: "CITY";
        }>;
    }, z.core.$strip>>>;
    media: z.ZodDefault<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            YOUTUBE: "YOUTUBE";
        }>;
        url: z.ZodString;
        thumbnailUrl: z.ZodOptional<z.ZodString>;
        alt: z.ZodString;
        position: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const updatePostSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    summary: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    publicationStatus: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PENDING_REVIEW: "PENDING_REVIEW";
        PUBLISHED: "PUBLISHED";
    }>>>;
    incidentDate: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    location: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
        country: z.ZodString;
        state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        locality: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        precision: z.ZodEnum<{
            HIDDEN: "HIDDEN";
            LOCALITY: "LOCALITY";
            EXACT: "EXACT";
            CITY: "CITY";
        }>;
    }, z.core.$strip>>>>;
    media: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            YOUTUBE: "YOUTUBE";
        }>;
        url: z.ZodString;
        thumbnailUrl: z.ZodOptional<z.ZodString>;
        alt: z.ZodString;
        position: z.ZodNumber;
    }, z.core.$strip>>>>;
    lifecycleStatus: z.ZodOptional<z.ZodEnum<{
        NEW: "NEW";
        DEVELOPING: "DEVELOPING";
        ONGOING: "ONGOING";
        RESOLVED: "RESOLVED";
    }>>;
    authorVisibility: z.ZodOptional<z.ZodEnum<{
        ANONYMOUS: "ANONYMOUS";
        PUBLIC: "PUBLIC";
    }>>;
}, z.core.$strip>;
export declare const commentSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
export declare const reportSchema: z.ZodObject<{
    contentType: z.ZodEnum<{
        post: "post";
        comment: "comment";
    }>;
    contentId: z.ZodString;
    reason: z.ZodEnum<{
        FALSE_MISLEADING: "FALSE_MISLEADING";
        PERSONAL_INFO: "PERSONAL_INFO";
        THREAT_HARASSMENT: "THREAT_HARASSMENT";
        ILLEGAL_MEDIA: "ILLEGAL_MEDIA";
        GRAPHIC_CONTENT: "GRAPHIC_CONTENT";
        COPYRIGHT: "COPYRIGHT";
        SPAM: "SPAM";
        WRONG_CATEGORY: "WRONG_CATEGORY";
    }>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const postFiltersSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    lifecycleStatus: z.ZodOptional<z.ZodEnum<{
        NEW: "NEW";
        DEVELOPING: "DEVELOPING";
        ONGOING: "ONGOING";
        RESOLVED: "RESOLVED";
    }>>;
    location: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodEnum<{
        most_discussed: "most_discussed";
        newest: "newest";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const moderationDecisionSchema: z.ZodObject<{
    action: z.ZodEnum<{
        PUBLISH: "PUBLISH";
        HIDE: "HIDE";
        REMOVE: "REMOVE";
        RESTORE: "RESTORE";
        DISMISS_REPORT: "DISMISS_REPORT";
        REVIEW_REPORT: "REVIEW_REPORT";
    }>;
    reviewerNote: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    lifecycleStatus: z.ZodEnum<{
        NEW: "NEW";
        DEVELOPING: "DEVELOPING";
        ONGOING: "ONGOING";
        RESOLVED: "RESOLVED";
    }>;
    media: z.ZodDefault<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            YOUTUBE: "YOUTUBE";
        }>;
        url: z.ZodString;
        thumbnailUrl: z.ZodOptional<z.ZodString>;
        alt: z.ZodString;
        position: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
