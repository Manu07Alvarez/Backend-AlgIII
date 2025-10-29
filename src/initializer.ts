// initializer.ts
import * as dotenv from 'dotenv';
dotenv.config();

console.log(`The connection URL is ${process.env.DATABASE_URL}`);

// Inicializar Socket.IO
import { Server } from 'socket.io';
import { httpServer } from './app.js'; // asegurate que exportás httpServer desde app.ts

globalThis.io = new Server(httpServer, {
  cors: { origin: '*' }
});

// Instrumentación y arranque
await import('./utils/telemetry/Instrumentation.js');
await import('./app.js');
