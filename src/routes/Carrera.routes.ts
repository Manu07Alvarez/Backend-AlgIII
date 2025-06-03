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

router.route('/:id')
.get((req: Request, res: Response) => {
  carreraController.getU(req, res);
})
export default router