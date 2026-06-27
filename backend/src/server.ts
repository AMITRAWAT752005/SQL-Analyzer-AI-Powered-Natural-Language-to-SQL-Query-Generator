import http from 'node:http';
import { createApp } from './app.js';
import env from './config/env.js';
import { connectPrisma, disconnectPrisma } from './config/prisma.js';
import logger from './utils/logger.js';

const app = createApp();
const server = http.createServer(app);

let isShuttingDown = false;

const startServer = async (): Promise<void> => {
  try {
    await connectPrisma();

    server.listen(env.port, () => {
      logger.info(`Server listening on port ${env.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

const shutdown = async (): Promise<void> => {
  if (isShuttingDown) return;
  isShuttingDown = true;
  logger.info('Graceful shutdown started');

  server.close(async () => {
    await disconnectPrisma();
    logger.info('Graceful shutdown complete');
    process.exit(0);
  });
};

process.on('SIGTERM', () => {
  void shutdown();
});

process.on('SIGINT', () => {
  void shutdown();
});

void startServer();
