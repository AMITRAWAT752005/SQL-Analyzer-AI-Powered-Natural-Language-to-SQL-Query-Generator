"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (data, message = 'Success', statusCode = 200) => ({
    success: true,
    data,
    message,
    statusCode,
});
exports.sendSuccess = sendSuccess;
const sendError = (message, statusCode = 500) => ({
    success: false,
    error: message,
    statusCode,
});
exports.sendError = sendError;
//# sourceMappingURL=response.js.map