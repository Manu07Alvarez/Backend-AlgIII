
/* eslint-disable @typescript-eslint/no-unused-vars */

import { trace } from '@opentelemetry/api';
import express from "express";
import { routes } from './routes/index';
import { generateAndSaveKeyPair } from "./utils/auth/KeyGen";
import swaggerOutput from "./docs/swagger-generated.json";
import swaggerUi from 'swagger-ui-express';
import pino from 'pino';
import { logger } from "./utils/logging/Logger";
const logs = pino();
const tracer = trace.getTracer('app');
generateAndSaveKeyPair();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput))

// ✅ Usar la instancia del logger (esto será interceptado por OpenTelemetry)
app.use('/', routes);

app.listen(5000, () => {
	console.log('Listening on port 5000');
});