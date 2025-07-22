import { Request, Response, Router } from "express";
import {createTemaController} from '../utils/factories/ClassFactory.js';
import {trace} from '@opentelemetry/api'

const router = Router()
const temaController = createTemaController();
const tracer = trace.getTracer('route-lib');

router.post('/create', (req: Request, res: Response) => {
    /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
            schema: {
                $ref: '#/components/schemas/temaSchema'
            },
            example: {
                nombre: "Reglamento",
                titulo: "Normas del foro",
                contenido: "Por favor leer antes de participar.",
                id_creador: 1,
                id_carrera: 2,
                fijado: false,
                cerrado: false,
            }
            }
        }
    }
    */
    temaController.create(req, res);
})

router.get('/findAll', (req: Request, res: Response) => {
    temaController.findAll(req, res);
})

router.get('/findById/:id', (req: Request, res: Response) => {
    temaController.findById(req, res);
})

router.get('/findByName/:name', (req: Request, res: Response) => {
    temaController.findByName(req, res);
})

router.put('/update/:id', (req: Request, res: Response) => {
    /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
            schema: {
                $ref: '#/components/schemas/Tema'
            },
            example: {
                nombre: "Reglamento",
                titulo: "Normas del foro",
                contenido: "Por favor leer antes de participar.",
                fijado: false,
                cerrado: false,
            }
            }
        }
        }
    */
    temaController.update(req, res);
})

router.put('/activateOrDeactivate/:id', (req: Request, res: Response) => {
    temaController.activateOrDeactivate(req, res);
})

router.delete('/delete/:id', (req: Request, res: Response) => {
    temaController.delete(req, res);
})

export default router;

