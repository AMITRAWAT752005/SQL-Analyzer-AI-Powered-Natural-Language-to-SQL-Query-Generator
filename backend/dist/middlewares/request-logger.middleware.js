"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const requestLogger = (req, _res, next) => {
    req.requestId = req.headers['x-request-id']?.toString() || `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    logger_js_1.default.info(`${req.method} ${req.originalUrl}`, { requestId: req.requestId, ip: req.ip });
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=request-logger.middleware.js.map