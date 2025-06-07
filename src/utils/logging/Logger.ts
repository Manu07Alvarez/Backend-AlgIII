import pino from 'pino-http';

const isDev = process.env.NODE_ENV !== 'production';

export const logger = isDev
  ? pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    })
  : pino();
