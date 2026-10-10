import { Request } from 'express';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly service;
    constructor(service: ReportsService);
    create(body: any, req: Request): Promise<{
        data: {
            id: any;
        };
    }>;
}
