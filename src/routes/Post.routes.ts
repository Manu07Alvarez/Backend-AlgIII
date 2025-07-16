import {Response, Request, Router} from "express";
import { createPostController } from "../utils/factories/ClassFactory.js";
import { trace } from '@opentelemetry/api';

const router = Router();
const postController = createPostController();
const tracer = trace.getTracer('route-lib');

router.post('/create', (req: Request, res: Response) => {
    postController.create(req, res);
});

router.get('/findAll', (req: Request, res: Response) => {
    postController.findAll(req, res);
});

router.get('/findById/:id', (req: Request, res: Response) => {
    postController.findById(req, res);
});

router.get('/findByName/:name', (req: Request, res: Response) => {
    postController.findByName(req, res);
});

router.put('/update/:id', (req: Request, res: Response) => {
    postController.update(req, res);
});

router.put('/activateOrDeactivate/:id', (req: Request, res: Response) => {
    postController.activateOrDeactivate(req, res);
});

router.delete('/delete/:id', (req: Request, res: Response) => {
    postController.delete(req, res);
});

export default router;  