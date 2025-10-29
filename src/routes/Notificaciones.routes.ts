import { Request, Response, Router } from 'express';
import { createNotificacionController } from '../utils/factories/ClassFactory.js';
import { trace } from '@opentelemetry/api';

const router = Router();
const notificacionController = createNotificacionController();
const tracer = trace.getTracer('route-lib');

/**
 * Crear una notificación
 */
router.post('/create', (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/PostNotificacionDTO' },
            example: {
              "contenido": "Nueva notificación para un usuario",
              "id_usuario": 3,
              "type": "post",
              "id_post": 2
            }
          }
        }
      }
  */
  notificacionController.create(req, res);
});

/**
 * Emitir una notificación manualmente (sin persistir en base de datos)
 */
router.post('/emit', (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/GetNotificacionDTO' },
            example: {
              "id": 999,
              "contenido": "Notificación directa",
              "id_usuario": 3,
              "leido": false,
              "createdAt": "2025-10-29T19:30:00.000Z",
              "usuario": null,
              "tema": null,
              "post": null,
              "Mensaje": null
            }
          }
        }
      }
  */
  notificacionController.emit(req, res);
});

/**
 * Listar todas las notificaciones de un usuario según su rol
 */
router.get('/user/:id_usuario', (req: Request, res: Response) => {
  notificacionController.findByUser(req, res);
});

/**
 * Marcar una notificación como leída
 */
router.put('/read/:id', (req: Request, res: Response) => {
  notificacionController.markAsRead(req, res);
});

/**
 * Eliminar una notificación
 */
router.delete('/delete/:id', (req: Request, res: Response) => {
  notificacionController.delete(req, res);
});

export default router;
