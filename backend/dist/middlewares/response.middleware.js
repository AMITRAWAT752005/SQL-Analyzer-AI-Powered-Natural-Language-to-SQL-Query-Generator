"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFormatter = void 0;
const response_js_1 = require("../utils/response.js");
const responseFormatter = (_req, res, next) => {
    res.locals.sendSuccess = (data, message, statusCode = 200) => {
        res.status(statusCode).json((0, response_js_1.sendSuccess)(data, message, statusCode));
    };
    next();
};
exports.responseFormatter = responseFormatter;
//# sourceMappingURL=response.middleware.js.map