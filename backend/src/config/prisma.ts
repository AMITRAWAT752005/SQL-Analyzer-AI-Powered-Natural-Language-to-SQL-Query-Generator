import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger.js';

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const connectPrisma = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info('Prisma connected successfully');
  } catch (error) {
    logger.warn('Prisma connection unavailable during startup, continuing in degraded mode', error);
  }
};

export const disconnectPrisma = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    logger.warn('Prisma disconnect encountered an error', error);
  }
};
