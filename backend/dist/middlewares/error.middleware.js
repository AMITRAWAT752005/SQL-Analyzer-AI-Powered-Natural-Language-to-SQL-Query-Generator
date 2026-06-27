"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const logger_js_1 = __importDefault(require("../utils/logger.js"));
const errors_js_1 = require("../utils/errors.js");
const response_js_1 = require("../utils/response.js");
const notFoundHandler = (req, res, next) => {
    const error = new errors_js_1.AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404);
    next(error);
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err instanceof errors_js_1.AppError ? err.statusCode : 500;
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    logger_js_1.default.error(message, { statusCode, stack: err instanceof Error ? err.stack : undefined });
    res.status(statusCode).json((0, response_js_1.sendError)(message, statusCode));
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map