import { DataSource } from 'typeorm';
export declare class CategoriesService {
    private readonly db;
    constructor(db: DataSource);
    list(): Promise<any>;
}
