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
export default router