import ICurriculumService from "../services/interfaces/ICurriculumService.js";   
import { Request, Response } from "express";
import { trace } from "@opentelemetry/api";
import type { Curriculum } from "db"; // si viene de Prisma
import { PaginationParams, PaginationResults} from "types/pagination.types.js";



const tracer = trace.getTracer('controller');

export class CurriculumController {
    constructor(
        private readonly CurriculumService: ICurriculumService) {}

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const curriculum: Curriculum = req.body;
            await this.CurriculumService.create(curriculum);
            res.status(201).json({ message: 'Curriculum created successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }  
        }    
    }  

    public async findByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            const curriculums = await this.CurriculumService.findAllInUserId(userId);
            res.status(200).json(curriculums);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }               
        }
    }

    public async findByName(req: Request, res: Response): Promise<void> {
        try {
            const name = req.params.name;   
            const curriculums = await this.CurriculumService.findByName(name);
            res.status(200).json(curriculums);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.CurriculumService.activateOrDeactivate(id);
            res.status(200).json({ message: 'Curriculum state updated successfully' });     
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }   
        };
    }
   
    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const curriculum: Curriculum = req.body;
            await this.CurriculumService.update(id, curriculum);
            res.status(200).json({ message: 'Curriculum updated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }  
        } 
    }


    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.CurriculumService.delete(id);
            res.status(200).json({ message: 'Curriculum deleted successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }       
    }
    }
    }
    