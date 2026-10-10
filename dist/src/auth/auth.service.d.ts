import { DataSource } from 'typeorm';
import { AuthenticatedUser, UserRole } from './auth.types';
export declare class AuthService {
    private readonly db;
    private readonly days;
    constructor(db: DataSource);
    normalizeMobile(v: string): string;
    hashToken(v: string): string;
    register(input: {
        mobile: string;
        password: string;
        username?: string;
        displayName?: string;
        email?: string;
    }): Promise<{
        user: {
            id: any;
            mobile: any;
            email: any;
            role: any;
            username: any;
            displayName: any;
            joinedAt: string;
        };
        token: {
            token: string;
            expiresAt: Date;
        };
    }>;
    login(input: {
        mobile: string;
        password: string;
    }): Promise<{
        user: {
            id: any;
            mobile: any;
            email: any;
            role: any;
            username: any;
            displayName: any;
            joinedAt: string;
        };
        token: {
            token: string;
            expiresAt: Date;
        };
    }>;
    createSession(userId: string): Promise<{
        token: string;
        expiresAt: Date;
    }>;
    revoke(token?: string): Promise<void>;
    revokeAll(userId: string): Promise<void>;
    changePassword(id: string, current: string, next: string): Promise<void>;
    getUserByToken(token?: string): Promise<AuthenticatedUser | null>;
    permissions(role: UserRole): string[];
    private slug;
}
