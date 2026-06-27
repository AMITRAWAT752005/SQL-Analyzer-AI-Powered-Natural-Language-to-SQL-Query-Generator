import type { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  req.requestId = req.headers['x-request-id']?.toString() || `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  logger.info(`${req.method} ${req.originalUrl}`, { requestId: req.requestId, ip: req.ip });
  next();
};
