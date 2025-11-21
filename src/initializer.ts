// initializer.ts
import * as dotenv from 'dotenv';
dotenv.config();

// Inicializar Socket.IO
import { Server } from 'socket.io';
import { httpServer } from './app.js'; // asegurate que exportás httpServer desde app.ts

globalThis.io = new Server(httpServer, {
  cors: { 
    origin: process.env.CORS_URL_FRONTEND || 'http://localhost:3000', 
    credentials: true 
  },
});

// Instrumentación y arranque
await import('./utils/telemetry/Instrumentation.js');
await import('./app.js');