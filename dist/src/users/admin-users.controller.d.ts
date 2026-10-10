import { Request } from 'express';
import { AdminUsersService } from './admin-users.service';
export declare class AdminUsersController {
    private readonly service;
    constructor(service: AdminUsersService);
    list(): Promise<{
        data: any;
    }>;
    updateRole(id: string, body: any, req: Request): Promise<{
        data: any;
    }>;
    updateStatus(id: string, body: any, req: Request): Promise<{
        data: any;
    }>;
}
