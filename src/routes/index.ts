import express from 'express';

import temaRoutes from './tema.Routes.ts';
import postRoutes from './post.routes.ts';
import userRoutes from './User.routes.ts';
import guestRoutes from './Guest.routes.ts';
import CarreraRoutes from './Carrera.routes.ts';

export const routes = express.Router();
routes.use('/api/Tema', temaRoutes);
routes.use('/api/user', userRoutes);
routes.use('/api/post', postRoutes);
routes.use('/api/guest', guestRoutes);
routes.use('/api/carrera', CarreraRoutes);