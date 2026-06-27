export declare const getEnv: () => {
    nodeEnv: string;
    port: number;
    appName: string;
    appUrl: string;
    databaseUrl: string;
    jwtAccessSecret: string;
    jwtRefreshSecret: string;
    corsOrigin: string;
    rateLimitWindowMs: number;
    rateLimitMaxRequests: number;
    logLevel: string;
    logFilePath: string;
    helmetEnabled: boolean;
    encryptionKey: string;
    encryptionIvSalt: string;
};
