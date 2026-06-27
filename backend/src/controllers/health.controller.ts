import type { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import env from '../config/env.js';
import { HTTP_STATUS, APP_VERSION } from '../constants/http.constants.js';
import logger from '../utils/logger.js';

export const healthCheck = async (_req: Request, res: Response): Promise<void> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(HTTP_STATUS.OK).json({
      status: 'ok',
      uptime: process.uptime(),
      environment: env.nodeEnv,
      database: 'connected',
      timestamp: new Date().toISOString(),
      version: APP_VERSION,
      service: env.appName,
    });
  } catch (error) {
    logger.error('Health check failed', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      uptime: process.uptime(),
      environment: env.nodeEnv,
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      version: APP_VERSION,
      service: env.appName,
    });
  }
};

export const readinessCheck = async (_req: Request, res: Response): Promise<void> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(HTTP_STATUS.OK).json({
      status: 'ready',
      uptime: process.uptime(),
      environment: env.nodeEnv,
      database: 'connected',
      timestamp: new Date().toISOString(),
      version: APP_VERSION,
      service: env.appName,
    });
  } catch (error) {
    logger.error('Readiness check failed', error);
    res.status(HTTP_STATUS.SERVICE_UNAVAILABLE ?? 503).json({
      status: 'not-ready',
      uptime: process.uptime(),
      environment: env.nodeEnv,
      database: 'disconnected',
      timestamp: new Date().toISOString(),
      version: APP_VERSION,
      service: env.appName,
    });
  }
};
