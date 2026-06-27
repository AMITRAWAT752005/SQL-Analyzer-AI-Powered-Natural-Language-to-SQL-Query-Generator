import type { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma.js';

export const withTransaction = async <TResult>(
  callback: (transaction: Prisma.TransactionClient) => Promise<TResult>,
): Promise<TResult> => prisma.$transaction(callback);
