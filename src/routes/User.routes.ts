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

router.get('/', (res: Response) => {
  userController.findAll(res);
});

router.route('/:id')
.get((req: Request, res: Response) => {
  userController.getUser(req, res);
})
.put((req: Request, res: Response) => {
  /*  #swagger.requestBody = {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/usuarioSchema'
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
  userController.update(req, res);
})
.patch((req: Request, res: Response) => {
  userController.deactivate(req, res);
})
export default router