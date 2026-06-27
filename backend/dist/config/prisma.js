"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectPrisma = exports.connectPrisma = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ?? new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
const connectPrisma = async () => {
    try {
        await exports.prisma.$connect();
        logger_js_1.default.info('Prisma connected successfully');
    }
    catch (error) {
        logger_js_1.default.warn('Prisma connection unavailable during startup, continuing in degraded mode', error);
    }
};
exports.connectPrisma = connectPrisma;
const disconnectPrisma = async () => {
    try {
        await exports.prisma.$disconnect();
    }
    catch (error) {
        logger_js_1.default.warn('Prisma disconnect encountered an error', error);
    }
};
exports.disconnectPrisma = disconnectPrisma;
//# sourceMappingURL=prisma.js.map