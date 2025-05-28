
import { Request, Router, Response } from 'express';
import { createUserController } from '../utils/factories/ClassFactory';

const router = Router();
const userController = createUserController();


router.get('/login', (req: Request, res: Response) => {
  userController.login(req, res);
});

router.post('/register', (req: Request, res: Response) => {
  userController.register(req, res);
});

export default router