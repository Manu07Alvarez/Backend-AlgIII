
/* eslint-disable @typescript-eslint/no-unused-vars */

import errlogger  from './utils/logging/Logger.ts';
const { trace } = await import('@opentelemetry/api');
const express = (await import('express')).default;
const { routes } = await import('./routes/index.ts');
const { generateAndSaveKeyPair } = await import("./utils/auth/KeyGen.ts");
import swaggerOutput from "./docs/swagger-generated.json" with { type: "json" };
const swaggerUi = (await import('swagger-ui-express')).default;
const tracer = trace.getTracer('app');
generateAndSaveKeyPair();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput))

// ✅ Usar la instancia del logger (esto será interceptado por OpenTelemetry)
app.use('/', routes);

errlogger.info('🚀 Server started');

app.listen(5000, () => {
	console.log('Listening on port 5000');
});