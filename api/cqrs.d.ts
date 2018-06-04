import * as Express from 'express';
export declare class Data {
    post: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => Promise<void>;
    test: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => Promise<void>;
    readonly Routes: {
        path: string;
        httpMethod: string[];
        middleware: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => Promise<void>;
    }[];
}
declare const routes: {
    path: string;
    httpMethod: string[];
    middleware: (req: Express.Request, res: Express.Response, next: Express.NextFunction) => Promise<void>;
}[];
export { routes };
