"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.isDatabaseAvailable = void 0;
const prisma_js_1 = require("../config/prisma.js");
const isDatabaseAvailable = async () => {
    try {
        await prisma_js_1.prisma.$connect();
        return true;
    }
    catch {
        return false;
    }
};
exports.isDatabaseAvailable = isDatabaseAvailable;
const disconnectDatabase = async () => {
    await prisma_js_1.prisma.$disconnect();
};
exports.disconnectDatabase = disconnectDatabase;
//# sourceMappingURL=connection.js.map