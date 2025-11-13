import { Request, Router, Response } from 'express';
import { createUserController } from '../utils/factories/ClassFactory.js';
import { validateUsuario } from '../middleware/validate_usuarios.js'; 

const router = Router();
const userController = createUserController();


router.get('/getPagination', (req: Request, res: Response) => {
  userController.getPagination(req, res);
});


router.get('/', (req: Request, res: Response) => {
  userController.findAll(req, res);
});

// 🔹 Obtener usuario autenticado actual
router.get('/actualAuthUser', (req: Request, res: Response) => {
  userController.actualAuthUser(req, res);
});

// 🔹 Rutas por ID
router
  .route('/:id')
  .get((req: Request, res: Response) => {
    userController.getUser(req, res);
  })
  // ✅ Validar datos antes de actualizar
  .put(validateUsuario, (req: Request, res: Response) => {
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
        },
      }
    */
    userController.update(req, res);
  })
  .patch((req: Request, res: Response) => {
    userController.deactivate(req, res);
  });

export default router;
