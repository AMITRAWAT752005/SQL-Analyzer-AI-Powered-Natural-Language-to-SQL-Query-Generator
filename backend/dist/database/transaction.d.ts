import type { Prisma } from '@prisma/client';
export declare const withTransaction: <TResult>(callback: (transaction: Prisma.TransactionClient) => Promise<TResult>) => Promise<TResult>;
