import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

export const logger = isDev
  ? pino({
  // ✅ Crear UNA instancia del logger que será instrumentada
    name: 'my-app',
    level: 'debug',
    // Opcional: configurar pretty printing para desarrollo
    })
  : pino();
  
