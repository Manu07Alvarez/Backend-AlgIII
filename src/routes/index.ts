import express from 'express';

import temaRoutes from './Tema.Routes.js';
import postRoutes from './Post.routes.js';
import userRoutes from './User.routes.js';
import guestRoutes from './Guest.routes.js';
import carreraRoutes from './Carrera.routes.js';
import mensajesRoutes from './Mensajes.routes.js';
import reportRoutes from './Reportes.routes.js';
import curriculumRoutes from './Curriculum.routes.js';
import { authToken } from '../middleware/middleware_auth.js';


export const routes = express.Router();
routes.use(authToken);
routes.use('/api/guest', guestRoutes
    /* #swagger.security = [{
        "cookieAuth": []
    }] */
); 
routes.use('/api/Tema', temaRoutes
    /* #swagger.security = [{
        "cookieAuth": []
    }] */
);
routes.use('/api/user', userRoutes
    /* #swagger.security = [{
        "cookieAuth": []
    }] */
);
routes.use('/api/post', postRoutes
    /* #swagger.security = [{
        "cookieAuth": []
    }] */
);

routes.use('/api/carrera', carreraRoutes
    /* #swagger.security = [{
        "cookieAuth": []
    }] */
);
routes.use('/api/mensajes', mensajesRoutes
    /* #swagger.security = [{
        "cookieAuth": []
    }] */
); // Assuming mensajes are handled by postRoutes
routes.use('/api/reporte', reportRoutes
    /* #swagger.security = [{
        "cookieAuth": []
    }] */
);
routes.use(
  "/api/curriculum", curriculumRoutes
  /* #swagger.security = [{
        "cookieAuth": []
    }] */
);
