import {Response, Request, Router} from "express";
import { createPostController } from "../utils/factories/ClassFactory.js";
import { trace } from '@opentelemetry/api';

const router = Router();
const postController = createPostController();
const tracer = trace.getTracer('route-lib');

router.post('/create', (req: Request, res: Response) => {
    /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
            schema: {
                $ref: '#/components/schemas/postSchema'
            },
            example: {
                titulo: "Primer post",
                contenido: "Hola mundo en el foro",
                published: true,
                id_autor: 1,
                id_tema: 2,
            }
            }
        }
        }
    */
    postController.create(req, res);
});
router.get('/getPagination', (req: Request, res: Response) => {
    postController.getPagination(req, res);
});

router.get('/findAll', (req: Request, res: Response) => {
    postController.findAll(req, res);
});

router.get('/findById/:id', (req: Request, res: Response) => {
    postController.findById(req, res);
});

router.get('/findByTitle/:title', (req: Request, res: Response) => {
    postController.findByTitle(req, res);
});

router.put('/update/:id', (req: Request, res: Response) => {
        /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
            schema: {
                $ref: '#/components/schemas/postSchema'
            },
            example: {
                titulo: "Primer post",
                contenido: "Hola mundo en el foro",
                published: true,
            }
            }
        }
        }
    */
    postController.update(req, res);
});

router.patch('/activateOrDeactivate/:id', (req: Request, res: Response) => {
    postController.activateOrDeactivate(req, res);
});

router.delete('/delete/:id', (req: Request, res: Response) => {
    postController.delete(req, res);
});


export default router;  