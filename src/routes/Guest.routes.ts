
import { Request, Router, Response, NextFunction } from 'express';
import { createUserController } from '../utils/factories/ClassFactory.js';
import { authLogin } from '../middleware/LoginMiddleware.js';

const router = Router();
const userController = createUserController();

router.use("/login", (req: Request, res: Response, next: NextFunction) => {
    authLogin(req, res, next);
});

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
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/registerSchema'
          },
          example: {
            nombre_apellido: "Juan Pérez",
            email: "juan@example.com",
            rol: "USUARIO",
            activo: true
          }
        }
      }
    }
  */
  userController.register(req, res);
});

export default router