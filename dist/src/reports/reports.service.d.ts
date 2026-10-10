import { DataSource } from 'typeorm';
import { AuthenticatedUser } from '../auth/auth.types';
export declare class ReportsService {
    private readonly db;
    constructor(db: DataSource);
    create(input: any, user: AuthenticatedUser): Promise<{
        id: any;
    }>;
    listOpen(): Promise<any>;
    review(id: string, action: string, note: string | undefined, user: AuthenticatedUser): Promise<any>;
}
