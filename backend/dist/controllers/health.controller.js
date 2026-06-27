"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readinessCheck = exports.healthCheck = void 0;
const prisma_js_1 = require("../config/prisma.js");
const env_js_1 = __importDefault(require("../config/env.js"));
const http_constants_js_1 = require("../constants/http.constants.js");
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const healthCheck = async (_req, res) => {
    try {
        await prisma_js_1.prisma.$queryRaw `SELECT 1`;
        res.status(http_constants_js_1.HTTP_STATUS.OK).json({
            status: 'ok',
            uptime: process.uptime(),
            environment: env_js_1.default.nodeEnv,
            database: 'connected',
            timestamp: new Date().toISOString(),
            version: http_constants_js_1.APP_VERSION,
            service: env_js_1.default.appName,
        });
    }
    catch (error) {
        logger_js_1.default.error('Health check failed', error);
        res.status(http_constants_js_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            uptime: process.uptime(),
            environment: env_js_1.default.nodeEnv,
            database: 'disconnected',
            timestamp: new Date().toISOString(),
            version: http_constants_js_1.APP_VERSION,
            service: env_js_1.default.appName,
        });
    }
};
exports.healthCheck = healthCheck;
const readinessCheck = async (_req, res) => {
    try {
        await prisma_js_1.prisma.$queryRaw `SELECT 1`;
        res.status(http_constants_js_1.HTTP_STATUS.OK).json({
            status: 'ready',
            uptime: process.uptime(),
            environment: env_js_1.default.nodeEnv,
            database: 'connected',
            timestamp: new Date().toISOString(),
            version: http_constants_js_1.APP_VERSION,
            service: env_js_1.default.appName,
        });
    }
    catch (error) {
        logger_js_1.default.error('Readiness check failed', error);
        res.status(http_constants_js_1.HTTP_STATUS.SERVICE_UNAVAILABLE ?? 503).json({
            status: 'not-ready',
            uptime: process.uptime(),
            environment: env_js_1.default.nodeEnv,
            database: 'disconnected',
            timestamp: new Date().toISOString(),
            version: http_constants_js_1.APP_VERSION,
            service: env_js_1.default.appName,
        });
    }
};
exports.readinessCheck = readinessCheck;
//# sourceMappingURL=health.controller.js.map