await import('./utils/telemetry/Instrumentation');
import express from "express";
import { routes } from './routes/index';
import { generateAndSaveKeyPair } from "./utils/auth/KeyGen";
import swaggerOutput from "./docs/swagger-generated.json";
import swaggerUi from 'swagger-ui-express';
import pino from "pino";


// ✅ Crear UNA instancia del logger que será instrumentada
const logger = pino({
  name: 'my-app',
  level: 'info',
  // Opcional: configurar pretty printing para desarrollo
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard'
    }
  } : undefined
});

generateAndSaveKeyPair();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput))

// ✅ Usar la instancia del logger (esto será interceptado por OpenTelemetry)
logger.info("Servidor iniciado");

// Agregar más logs para probar la instrumentación
logger.debug("Configurando rutas");
logger.warn("Este es un log de warning para prueba");

app.use('/', routes);

app.listen(5000, () => {
	console.log('Listening on port 5000');
});