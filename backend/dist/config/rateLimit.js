"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_js_1 = __importDefault(require("./env.js"));
exports.generalRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: env_js_1.default.rateLimitWindowMs,
    max: env_js_1.default.rateLimitMaxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later.',
});
//# sourceMappingURL=rateLimit.js.map