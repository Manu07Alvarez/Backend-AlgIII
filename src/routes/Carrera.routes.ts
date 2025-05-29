import { Request , Router, Response } from 'express';
import { createUserController } from '../utils/factories/ClassFactory';

const router = Router()
const userController = createUserController();

/**router.use((req: Request, res: Response, next: NextFunction) => {
  const respon = veryfylogin
  if (res.status(201) === respon){
    res.send(veryfylogin)
  }
  next()
}) **/

router.route('/:id')
.get((req: Request, res: Response) => {
  userController.getU(req, res);
})
export default router