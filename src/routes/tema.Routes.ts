import { Request, Response, Router } from "express";
import {createTemaController} from '../utils/factories/ClassFactory.ts';
import {trace} from '@opentelemetry/api'

const router = Router()
const temaController = createTemaController();
const tracer = trace.getTracer('route-lib');

router.post('/create', (req: Request, res: Response) => {
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
    temaController.update(req, res);
})

router.put('/activateOrDeactivate/:id', (req: Request, res: Response) => {
    temaController.activateOrDeactivate(req, res);
})

router.delete('/delete/:id', (req: Request, res: Response) => {
    temaController.delete(req, res);
})

export default router;

