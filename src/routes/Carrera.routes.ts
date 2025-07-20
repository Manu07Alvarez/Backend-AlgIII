/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request , Router, Response } from 'express';
import { createCarreraController } from '../utils/factories/ClassFactory.js';

const router = Router()
const carreraController = createCarreraController();

/**router.use((req: Request, res: Response, next: NextFunction) => {
  const respon = veryfylogin
  if (res.status(201) === respon){
    res.send(veryfylogin)
  }
  next()
}) **/
import { trace } from '@opentelemetry/api';
import { Carrera } from 'schemas/Carreras.schemas.js';

const tracer = trace.getTracer('route-lib');

router.post('/create', (req: Request, res: Response) => {
  /* #swagger.parameters['body'] = {
       in: 'body',
      description: 'Datos del usuario a registrar.',
      required: true,
      schema: {
          nombre_apellido: 'Juan Pérez',
         email: 'juan@example.com',
          contraseña: 'secure123',
        rol: 'USUARIO',
          activo: true
      }
  }*/
  carreraController.create(req, res);
})

router.get('/', (req: Request, res: Response) => {
  carreraController.findAll(req, res);
})

router.route('/:name')
.get((req: Request, res: Response) => {
  carreraController.findByName(req, res);
})

router.route('/:id')
.get((req: Request, res: Response) => {
  carreraController.findById(req, res);
}) 
.patch((req: Request, res: Response) => {
  
  carreraController.activateOrDeactivate(req, res);

  // #swagger.autoBody = true 
})
.put((req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/carrerasSchema'
            },
            example: {
              "nombre": "Ingeniería en Sistemas",
              "descripcion": "Carrera orientada al desarrollo de software",
              "activa": true
            }
          }
        },
      }
    */
  // #swagger.consumes = ['application/json']
  carreraController.update(req, res);
  // #swagger.autoBody = true 
})

export default router