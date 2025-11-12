import { Request , Router, Response } from 'express';
import { createCurriculumController } from '../utils/factories/ClassFactory.js';

const router = Router()
const curriculumController = createCurriculumController();

router.post('/create', (req: Request, res: Response) => {       
    /*  #swagger.requestBody = {
            required: true,     
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/curriculumSchema'