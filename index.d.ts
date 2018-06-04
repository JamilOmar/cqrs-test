interface ILogger {
    info: (...message: any[]) => void;
    error: (...message: any[]) => void;
    warn: (...message: any[]) => void;
}
interface IServicesConfig {
    ServicePath?: string;
    auth: {
        organization: string;
        audience: string;
    };
    listen?: {
        url?: string;
        port?: number;
    };
}
declare namespace NodeJS {
    interface Global {
        LabShare: {
            Config: {
                services: IServicesConfig;
                sb: any;
                data: any;
            };
            Logger: ILogger;
        };
        Process: {
            ProcessEnv: {
                NODE_ENV: string;
            };
        };
    }
}
