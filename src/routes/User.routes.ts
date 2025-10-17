import { Request , Router, Response } from 'express';
import { createUserController } from '../utils/factories/ClassFactory.js';

const router = Router()
const userController = createUserController();
/**
 * @swagger
 * /users/getPagination:
 *   get:
 *     summary: Obtiene usuarios paginados
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Lista paginada de usuarios
 */
router.get('/getPagination', (req: Request, res: Response) => {
    userController.getPagination(req, res);
});

/**router.use((req: Request, res: Response, next: NextFunction) => {
  const respon = veryfylogin
  if (res.status(201) === respon){
    res.send(veryfylogin)
  }
  next()
}) **/

router.get('/', (req: Request, res: Response) => {
  userController.findAll(req, res);
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