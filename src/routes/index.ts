import express from 'express';

import temaRoutes from './Tema.Routes.js';
import postRoutes from './Post.routes.js';
import userRoutes from './User.routes.js';
import guestRoutes from './Guest.routes.js';
import CarreraRoutes from './Carrera.routes.js';
import mensajesRoutes from './Mensajes.routes.js';

export const routes = express.Router();
routes.use('/api/Tema', temaRoutes);
routes.use('/api/user', userRoutes);
routes.use('/api/post', postRoutes);
routes.use('/api/guest', guestRoutes);
routes.use('/api/carrera', CarreraRoutes);
routes.use('/api/mensajes', mensajesRoutes); // Assuming mensajes are handled by postRoutes