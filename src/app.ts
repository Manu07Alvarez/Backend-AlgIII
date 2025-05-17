import express from "express";
import userRoutes from './routes/UserRoutes';
const app = express();

app.use('/api/user', userRoutes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});