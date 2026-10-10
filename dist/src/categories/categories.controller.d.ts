import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly service;
    constructor(service: CategoriesService);
    list(): Promise<{
        data: any;
    }>;
}
