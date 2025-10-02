import { Request , Router, Response } from 'express';
import { createTestController } from '../utils/factories/ClassFactory.js';
import { trace } from '@opentelemetry/api';
const router = Router()
const testController = createTestController();
const tracer = trace.getTracer('route-lib');


router.get('/topics', (req: Request, res: Response) => {
  testController.findAllTopics(req, res);
});


export default router