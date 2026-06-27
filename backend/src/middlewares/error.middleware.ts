import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import { AppError } from '../utils/errors.js';
import { sendError } from '../utils/response.js';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404);
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : 'Internal Server Error';

  logger.error(message, { statusCode, stack: err instanceof Error ? err.stack : undefined });

  res.status(statusCode).json(sendError(message, statusCode));
};
