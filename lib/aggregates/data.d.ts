import { Models } from '@labshare/services-bus';
export declare class DataAggregate extends Models.Entities.Aggregate {
    id: string;
    name: string;
    constructor(id?: string);
    log(data: any): Promise<any>;
}
