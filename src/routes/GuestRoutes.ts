
import { Request, Router, Response } from 'express';
import { createUserController } from '../utils/factories/UserFactory';

const router = Router();
const userController = createUserController();

router.get('/', (req: Request, res: Response) => {
  res.send('GET guest');
});

router.post('/register', (req: Request, res: Response) => {
  userController.register(req, res);
});

export default router