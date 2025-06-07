import { logger } from './utils/logging/Logger';
import express from "express";
import { routes } from './routes/index';
import { generateAndSaveKeyPair } from "./utils/auth/KeyGen";
import swaggerOutput from "./docs/swagger-generated.json";
import swaggerUi from 'swagger-ui-express';
import pino from "pino-http";
generateAndSaveKeyPair();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput))
app.use(pino(logger));
app.use('/', routes);

app.listen(5000, () => {
    console.log('Listening on port 5000');
});