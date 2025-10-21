
/* eslint-disable @typescript-eslint/no-unused-vars */

const { trace } = await import('@opentelemetry/api');
const express = (await import('express')).default;
const { routes } = await import('./routes/index.js');
const { generateAndSaveKeyPair } = await import("./utils/auth/KeyGen.js");
import swaggerOutput from "./docs/swagger-generated.json" with { type: "json" };
const swaggerUi = (await import('swagger-ui-express')).default;
const tracer = trace.getTracer('app');
generateAndSaveKeyPair();
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput, {
    swaggerOptions: {
        persistAuthorization: true,
    },
}))

app.use('/', routes);

app.listen(5000, '0.0.0.0');



// ✅ Usar la instancia del logger (esto será interceptado por OpenTelemetry)
