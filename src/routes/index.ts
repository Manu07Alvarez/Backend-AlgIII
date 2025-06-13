import express from 'express';

import userRoutes from './User.routes.ts';
import guestRoutes from './Guest.routes.ts';
import CarreraRoutes from './Carrera.routes.ts';

export const routes = express.Router();

routes.use('/api/user', userRoutes);
routes.use('/api/guest', guestRoutes);
routes.use('/api/carrera', CarreraRoutes);