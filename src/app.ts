import express from "express";
import { routes } from './routes/index';
import { generateAndSaveKeyPair } from "./utils/auth/KeyGen";
import swaggerOutput from "./docs/swagger-generated.json";
import swaggerUi from 'swagger-ui-express';
const app = express();
await generateAndSaveKeyPair();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput))
app.use('/', routes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});