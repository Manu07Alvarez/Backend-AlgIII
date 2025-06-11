
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);
await jiti.import('./utils/telemetry/Instrumentation.ts');
const { trace } = await import('@opentelemetry/api');
const express = (await import('express')).default;
const { routes } = await import('./routes/index');
const { generateAndSaveKeyPair } = await import("./utils/auth/KeyGen");
const swaggerOutput = (await import("./docs/swagger-generated.json")).default;
const swaggerUi = (await import('swagger-ui-express')).default;
const pino = (await import('pino')).default;
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