import type { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/response.js';

export const responseFormatter = (_req: Request, res: Response, next: NextFunction): void => {
  res.locals.sendSuccess = <T>(data: T, message?: string, statusCode = 200) => {
    res.status(statusCode).json(sendSuccess(data, message, statusCode));
  };

  next();
};
