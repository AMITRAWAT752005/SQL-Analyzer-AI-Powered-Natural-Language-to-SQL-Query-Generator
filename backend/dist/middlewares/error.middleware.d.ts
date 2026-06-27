import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
export declare const notFoundHandler: (req: Request, res: Response, next: NextFunction) => void;
export declare const errorHandler: ErrorRequestHandler;
