// Add `winston-errsole` transport
import errsole from 'errsole';
import ErrsoleSQLite from 'errsole-sqlite';
import os from 'node:os';
import path from 'node:path';
import winston from 'winston';
import WinstonErrsole from 'winston-errsole';

const errlogger = winston.createLogger({
  level: 'debug',
  transports: [new WinstonErrsole()]
});

// Setup Errsole
const logFile = path.join(os.tmpdir(), 'app.log.sqlite');
errsole.initialize({
  storage: new ErrsoleSQLite(logFile)
});

export default errlogger;