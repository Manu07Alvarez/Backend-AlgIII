/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request , Router, Response } from 'express';
import { createCarreraController } from '../utils/factories/ClassFactory';

const router = Router()
const carreraController = createCarreraController();

/**router.use((req: Request, res: Response, next: NextFunction) => {
  const respon = veryfylogin
  if (res.status(201) === respon){
    res.send(veryfylogin)
  }
  next()
}) **/
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('route-lib');

router.post('/create', (req: Request, res: Response) => {
  carreraController.create(req, res);
})

router.get('/', (req: Request, res: Response) => {
  carreraController.findAll(req, res);
})

router.route('/:name')
.get((req: Request, res: Response) => {
  carreraController.findByName(req, res);
})

router.route('/:id')
.get((req: Request, res: Response) => {
  carreraController.findById(req, res);
}) 
.patch((req: Request, res: Response) => {
  carreraController.activateOrDeactivate(req, res);
})
.put((req: Request, res: Response) => {
  carreraController.update(req, res);
})

export default router