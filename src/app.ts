/* eslint-disable @typescript-eslint/no-unused-vars */
import http from 'http';
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
const httpServer = http.createServer(app); // ← esto es nuevo

app.use(cors({
    origin: process.env.CORS_URL_FRONTEND || 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput, {
    swaggerOptions: {
        persistAuthorization: true,
    },
}));

app.use('/', routes);

// Exportás el server para usarlo en initializer.ts
export { httpServer };

httpServer.listen({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
});
console.log(`\x1b[1;32mServidor iniciado en la URL: http://${process.env.HOST}:${process.env.PORT} \x1b[0m`);
