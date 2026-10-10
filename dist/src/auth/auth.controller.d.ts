import { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    register(body: any, res: Response): Promise<{
        data: {
            id: any;
            mobile: any;
            email: any;
            role: any;
            username: any;
            displayName: any;
            joinedAt: string;
        };
    }>;
    login(body: any, res: Response): Promise<{
        data: {
            id: any;
            mobile: any;
            email: any;
            role: any;
            username: any;
            displayName: any;
            joinedAt: string;
        };
    }>;
    logout(req: Request, res: Response): Promise<{
        data: null;
    }>;
    logoutAll(req: Request, res: Response): Promise<{
        data: null;
    }>;
    me(req: Request): Promise<{
        data: {
            user: any;
            permissions: string[];
        };
    }>;
    permissions(req: Request): Promise<{
        data: {
            role: any;
            permissions: string[];
        };
    }>;
    changePassword(body: any, req: Request, res: Response): Promise<{
        data: {
            message: string;
        };
    }>;
    private tokenFromRequest;
}
