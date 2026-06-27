"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClient = exports.prisma = void 0;
const prisma_js_1 = require("../config/prisma.js");
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return prisma_js_1.prisma; } });
const getPrismaClient = () => prisma_js_1.prisma;
exports.getPrismaClient = getPrismaClient;
//# sourceMappingURL=prisma.js.map