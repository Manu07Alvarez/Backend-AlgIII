import { Request , Router, Response } from 'express';
import { createReporteController} from '../utils/factories/ClassFactory.js';

const router = Router()
const reportController = createReporteController();


router.get('/', (req: Request, res: Response) => {
  reportController.findAll(req, res);
});

router.post('/create', (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/reportSchema'
            },
            example: {
              "descripcion": "abusadol",
              "id_reportador": 1,
              "id_type": 1,
              "type": "tema",
            }
          }
        },
      }
  */
  reportController.create(req, res);
})

router.route('/:id')
.get((req: Request, res: Response) => {
  reportController.findById(req, res);
})

router.get('/users', (req: Request, res: Response) => {
  reportController.findAllUsers(req, res);
});

router.get('/posts', (req: Request, res: Response) => {
  reportController.findAllPosts(req, res);
});

router.get('/topics', (req: Request, res: Response) => {
  reportController.findAllTopics(req, res);
});

router.get('/messages', (req: Request, res: Response) => {
  reportController.findAllMessages(req, res);
});

router.put('/resolve/:id', (req: Request, res: Response) => {
  reportController.resolveReport(req, res);
})

router.put('/deresolve/:id', (req: Request, res: Response) => {
  reportController.deresolveReport(req, res);
})

export default router