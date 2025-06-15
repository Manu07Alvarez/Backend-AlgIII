
import { Request, Router, Response } from 'express';
import { createUserController } from '../utils/factories/ClassFactory.ts';

const router = Router();
const userController = createUserController();


router.post('/login', (req: Request, res: Response) => {
  userController.login(req, res);
  /*  #swagger.requestBody = {
        required: true,
        schema: { $ref : '#/components/schemas/loginSchema' },
      },
      } 
    */
  /* #swagger.responses[200] = {
        description: 'Cookie response',
        schema: { $ref: '#/components/schemas/securitySchema' },
      },   
  */
});

router.post('/register', (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        schema: { $ref : '#/components/schemas/registerSchema' },
      },
  */
  userController.register(req, res);
});

export default router