import {Response, Request, Router} from "express";
import { createMensajeController } from "../utils/factories/ClassFactory.js";
import { trace } from '@opentelemetry/api';

const router = Router();
const mensajesController = createMensajeController();
const tracer = trace.getTracer('route-lib');

router.post('/create', (req: Request, res: Response) => {
    /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
            schema: {
                $ref: '#/components/schemas/Mensaje'
            },
            example: {
                contenido: "Estoy de acuerdo con este post",
                id_autor: 1,
                id_post: 2,
                id_mensaje: null,
            }
            }
        }
        }
    */

    mensajesController.create(req, res);
});

router.get('/findAll', (req: Request, res: Response) => {
    mensajesController.findAll(req, res);
});

router.get('/findById/:id', (req: Request, res: Response) => {
    mensajesController.findById(req, res);
});

router.put('/update/:id', (req: Request, res: Response) => {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Mensaje'
                    },
                    example: {
                        contenido: "Estoy de acuerdo con este post",
                        id_mensaje: null,
                    }
                }
            }
        }
    */
    mensajesController.update(req, res);
});

router.patch('/activateOrDeactivate/:id', (req: Request, res: Response) => {
    mensajesController.activateOrDeactivate(req, res);
});

router.delete('/delete/:id', (req: Request, res: Response) => {
    mensajesController.delete(req, res);
});

export default router;  