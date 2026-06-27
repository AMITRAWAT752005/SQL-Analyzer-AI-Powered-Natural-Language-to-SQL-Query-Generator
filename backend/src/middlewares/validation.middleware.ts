import type { Request, Response, NextFunction } from 'express';

export const validationPlaceholder = (_req: Request, _res: Response, next: NextFunction): void => {
  next();
};
