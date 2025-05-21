import express from "express";
import userRoutes from './routes/UserRoutes';
import guestRoutes from './routes/GuestRoutes';
import { generateSwaggerSpec } from 'swagger-typescript-api'
import swaggerUi from 'swagger-ui-express';
const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/guest', guestRoutes)
app.listen(3000, () => {
    console.log('Listening on port 3000');
});