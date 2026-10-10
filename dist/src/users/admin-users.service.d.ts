import { DataSource } from 'typeorm';
import { UserRole, UserStatus } from '../auth/auth.types';
export declare class AdminUsersService {
    private readonly db;
    constructor(db: DataSource);
    list(): Promise<any>;
    updateRole(id: string, role: UserRole, actor: string): Promise<any>;
    updateStatus(id: string, status: UserStatus, actor: string): Promise<any>;
}
