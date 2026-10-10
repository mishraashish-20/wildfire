export declare const UserRole: {
    readonly USER: "USER";
    readonly MODERATOR: "MODERATOR";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED';
export interface AuthenticatedUser {
    id: string;
    role: UserRole;
    mobile: string;
    username: string;
    displayName: string | null;
    joinedAt: string;
}
