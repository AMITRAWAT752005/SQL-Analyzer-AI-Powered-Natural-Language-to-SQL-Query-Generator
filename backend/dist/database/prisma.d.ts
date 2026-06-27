import { prisma } from '../config/prisma.js';
export { prisma };
export declare const getPrismaClient: () => import("@prisma/client").PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
