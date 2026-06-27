import express, { type Express } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env.js';
import { corsOptions } from './config/cors.js';
import { generalRateLimiter } from './config/rateLimit.js';
import { requestLogger } from './middlewares/request-logger.middleware.js';
import { responseFormatter } from './middlewares/response.middleware.js';
import { validationPlaceholder } from './middlewares/validation.middleware.js';
import { authPlaceholder } from './middlewares/auth.middleware.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import healthRoutes from './routes/health.routes.js';
import logger from './utils/logger.js';

export const createApp = (): Express => {
  const app = express();

  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());
  app.use(generalRateLimiter);
  app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));
  app.use(requestLogger);
  app.use(responseFormatter);
  app.use(validationPlaceholder);
  app.use(authPlaceholder);

  app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Backend foundation is running' });
  });

  app.use(healthRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
