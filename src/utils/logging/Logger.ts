import pino from 'pino-http';

const isDev = process.env.NODE_ENV !== 'production';

export const logger = isDev
  ? pino({

    })
  : pino();
