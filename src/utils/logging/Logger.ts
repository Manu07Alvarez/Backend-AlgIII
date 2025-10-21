// Add `winston-errsole` transport
import os from 'node:os';
import path from 'node:path';
import winston from 'winston';

const errlogger = winston.createLogger({
  level: 'debug',
  transports: [new winston.transports.Console()],
});

// Setup Errsole
export default errlogger;