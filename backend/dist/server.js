"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const app_js_1 = require("./app.js");
const env_js_1 = __importDefault(require("./config/env.js"));
const prisma_js_1 = require("./config/prisma.js");
const logger_js_1 = __importDefault(require("./utils/logger.js"));
const app = (0, app_js_1.createApp)();
const server = node_http_1.default.createServer(app);
let isShuttingDown = false;
const startServer = async () => {
    try {
        await (0, prisma_js_1.connectPrisma)();
        server.listen(env_js_1.default.port, () => {
            logger_js_1.default.info(`Server listening on port ${env_js_1.default.port}`);
        });
    }
    catch (error) {
        logger_js_1.default.error('Failed to start server', error);
        process.exit(1);
    }
};
const shutdown = async () => {
    if (isShuttingDown)
        return;
    isShuttingDown = true;
    logger_js_1.default.info('Graceful shutdown started');
    server.close(async () => {
        await (0, prisma_js_1.disconnectPrisma)();
        logger_js_1.default.info('Graceful shutdown complete');
        process.exit(0);
    });
};
process.on('SIGTERM', () => {
    void shutdown();
});
process.on('SIGINT', () => {
    void shutdown();
});
void startServer();
//# sourceMappingURL=server.js.map