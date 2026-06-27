"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_js_1 = require("./config/cors.js");
const rateLimit_js_1 = require("./config/rateLimit.js");
const request_logger_middleware_js_1 = require("./middlewares/request-logger.middleware.js");
const response_middleware_js_1 = require("./middlewares/response.middleware.js");
const validation_middleware_js_1 = require("./middlewares/validation.middleware.js");
const auth_middleware_js_1 = require("./middlewares/auth.middleware.js");
const error_middleware_js_1 = require("./middlewares/error.middleware.js");
const health_routes_js_1 = __importDefault(require("./routes/health.routes.js"));
const logger_js_1 = __importDefault(require("./utils/logger.js"));
const createApp = () => {
    const app = (0, express_1.default)();
    app.set('trust proxy', 1);
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)(cors_js_1.corsOptions));
    app.use((0, compression_1.default)());
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((0, cookie_parser_1.default)());
    app.use(rateLimit_js_1.generalRateLimiter);
    app.use((0, morgan_1.default)('combined', { stream: { write: (message) => logger_js_1.default.info(message.trim()) } }));
    app.use(request_logger_middleware_js_1.requestLogger);
    app.use(response_middleware_js_1.responseFormatter);
    app.use(validation_middleware_js_1.validationPlaceholder);
    app.use(auth_middleware_js_1.authPlaceholder);
    app.get('/', (_req, res) => {
        res.status(200).json({ message: 'Backend foundation is running' });
    });
    app.use(health_routes_js_1.default);
    app.use(error_middleware_js_1.notFoundHandler);
    app.use(error_middleware_js_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map