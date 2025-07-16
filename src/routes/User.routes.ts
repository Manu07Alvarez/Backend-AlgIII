import { Request , Router, Response } from 'express';
import { createUserController } from '../utils/factories/ClassFactory.js';

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
  userController.getUser(req, res);
})
.put((req: Request, res: Response) => {
  userController.update(req, res);
})
.patch((req: Request, res: Response) => {
  userController.deactivate(req, res);
})
export default router