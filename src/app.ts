
/* eslint-disable @typescript-eslint/no-unused-vars */

import errlogger  from './utils/logging/Logger.js';
const { trace } = await import('@opentelemetry/api');
const express = (await import('express')).default;
const { routes } = await import('./routes/index.js');
const { generateAndSaveKeyPair } = await import("./utils/auth/KeyGen.js");
import swaggerOutput from "./docs/swagger-generated.json" with { type: "json" };
const swaggerUi = (await import('swagger-ui-express')).default;
const tracer = trace.getTracer('app');
generateAndSaveKeyPair();
import cors from 'cors';
import { createProxyMiddleware } from "http-proxy-middleware";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.use("/errsole", createProxyMiddleware({ target: "http://localhost:8001", changeOrigin: true }));

// ✅ Usar la instancia del logger (esto será interceptado por OpenTelemetry)
app.use('/', routes);

errlogger.info('🚀 Server started');

app.listen(8001, '0.0.0.0');