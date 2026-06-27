import { prisma } from '../config/prisma.js';

export const isDatabaseAvailable = async (): Promise<boolean> => {
  try {
    await prisma.$connect();
    return true;
  } catch {
    return false;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
};
