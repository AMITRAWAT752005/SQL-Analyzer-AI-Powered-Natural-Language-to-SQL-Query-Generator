"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const errors_js_1 = require("../utils/errors.js");
dotenv_1.default.config({ path: node_path_1.default.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`) });
dotenv_1.default.config({ path: node_path_1.default.resolve(process.cwd(), '.env') });
const requiredEnvVars = [
    'NODE_ENV',
    'PORT',
    'APP_NAME',
    'APP_URL',
    'DATABASE_URL',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'CORS_ORIGIN',
    'RATE_LIMIT_WINDOW_MS',
    'RATE_LIMIT_MAX_REQUESTS',
    'LOG_LEVEL',
    'ENCRYPTION_KEY',
    'ENCRYPTION_IV_SALT',
];
function parseNumber(value, fallback) {
    if (!value)
        return fallback;
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
        throw new errors_js_1.AppError(`Invalid numeric env value: ${value}`);
    }
    return parsed;
}
const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseNumber(process.env.PORT, 4000),
    appName: process.env.APP_NAME || 'SQL Generator Backend',
    appUrl: process.env.APP_URL || 'http://localhost:4000',
    databaseUrl: process.env.DATABASE_URL || '',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || '',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    rateLimitWindowMs: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    rateLimitMaxRequests: parseNumber(process.env.RATE_LIMIT_MAX_REQUESTS, 100),
    logLevel: process.env.LOG_LEVEL || 'info',
    logFilePath: process.env.LOG_FILE_PATH || './logs/app.log',
    helmetEnabled: process.env.HELMET_ENABLED !== 'false',
    encryptionKey: process.env.ENCRYPTION_KEY || '',
    encryptionIvSalt: process.env.ENCRYPTION_IV_SALT || '',
};
for (const key of requiredEnvVars) {
    const value = (() => {
        switch (key) {
            case 'NODE_ENV':
                return env.nodeEnv;
            case 'PORT':
                return env.port;
            case 'APP_NAME':
                return env.appName;
            case 'APP_URL':
                return env.appUrl;
            case 'DATABASE_URL':
                return env.databaseUrl;
            case 'JWT_ACCESS_SECRET':
                return env.jwtAccessSecret;
            case 'JWT_REFRESH_SECRET':
                return env.jwtRefreshSecret;
            case 'CORS_ORIGIN':
                return env.corsOrigin;
            case 'RATE_LIMIT_WINDOW_MS':
                return env.rateLimitWindowMs;
            case 'RATE_LIMIT_MAX_REQUESTS':
                return env.rateLimitMaxRequests;
            case 'LOG_LEVEL':
                return env.logLevel;
            case 'ENCRYPTION_KEY':
                return env.encryptionKey;
            case 'ENCRYPTION_IV_SALT':
                return env.encryptionIvSalt;
            default:
                return undefined;
        }
    })();
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        throw new errors_js_1.AppError(`Missing required environment variable: ${key}`);
    }
}
exports.default = env;
//# sourceMappingURL=env.js.map