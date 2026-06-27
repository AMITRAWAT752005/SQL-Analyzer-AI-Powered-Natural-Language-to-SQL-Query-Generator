"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTransaction = void 0;
const prisma_js_1 = require("../config/prisma.js");
const withTransaction = async (callback) => prisma_js_1.prisma.$transaction(callback);
exports.withTransaction = withTransaction;
//# sourceMappingURL=transaction.js.map