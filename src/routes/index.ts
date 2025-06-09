import express from 'express';

import userRoutes from './User.routes';
import guestRoutes from './Guest.routes';
import CarreraRoutes from './Carrera.routes';

export const routes = express.Router();

routes.use('/api/user', userRoutes);
routes.use('/api/guest', guestRoutes);
routes.use('/api/carrera', CarreraRoutes);