import {Response, Request, Router} from "express";
import { createMensajeController } from "../utils/factories/ClassFactory.js";
import { trace } from '@opentelemetry/api';

const router = Router();
const mensajesController = createMensajeController();
const tracer = trace.getTracer('route-lib');

router.post('/create', (req: Request, res: Response) => {
    mensajesController.create(req, res);
});

router.get('/findAll', (req: Request, res: Response) => {
    mensajesController.findAll(req, res);
});

router.get('/findById/:id', (req: Request, res: Response) => {
    mensajesController.findById(req, res);
});

router.put('/update/:id', (req: Request, res: Response) => {
    mensajesController.update(req, res);
});

router.put('/activateOrDeactivate/:id', (req: Request, res: Response) => {
    mensajesController.activateOrDeactivate(req, res);
});

router.delete('/delete/:id', (req: Request, res: Response) => {
    mensajesController.delete(req, res);
});

export default router;  