import { Request , Router, Response } from 'express';
import { createUserController } from '../utils/factories/ClassFactory.js';

const router = Router()
const userController = createUserController();

router.get('/getPagination', (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Obtiene usuarios paginados'
    #swagger.description = 'Devuelve una lista de usuarios con paginación, búsqueda, ordenamiento y filtrado opcional.'

    #swagger.parameters['page'] = { 
      in: 'query',
      description: 'Número de página',
      required: false,
      type: 'integer',
      default: 1
    }

    #swagger.parameters['limit'] = { 
      in: 'query',
      description: 'Cantidad de usuarios por página',
      required: false,
      type: 'integer',
      default: 10
    }

    #swagger.parameters['search'] = { 
      in: 'query',
      description: 'Texto para buscar usuarios por nombre y apellido, u email',
      required: false,
      type: 'string'
    }

    #swagger.parameters['sortBy'] = { 
      in: 'query',
      description: 'Campo por el cual se ordenarán los resultados',
      required: false,
      type: 'string'
    }

    #swagger.parameters['sortOrder'] = { 
      in: 'query',
      description: 'Dirección del ordenamiento: ascendente o descendente',
      required: false,
      type: 'string',
      enum: ['asc', 'desc']
    }

    #swagger.responses[200] = {
      description: 'Lista paginada de usuarios',
      schema: {
        success: true,
        total: 100,
        page: 1,
        limit: 10,
        data: [
          { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
          { id: 2, name: 'Ana López', email: 'ana@example.com' }
        ]
      }
    }
  */

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