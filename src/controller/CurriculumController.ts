import ICurriculumRepository from "repositories/interfaces/ICurriculumRepository.js";   
import { Curriculum } from "db";
import { trace } from "@opentelemetry/api";
import { Request, Response } from "express";

const tracer = trace.getTracer('controller');

export class CurriculumController {
    constructor(
        private readonly CurriculumRepository: ICurriculumRepository
    ) {}

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const curriculum: Curriculum = req.body;
            await this.CurriculumRepository.create(curriculum);
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
            const curriculums = await this.CurriculumRepository.findAllInUserId(userId);
            res.status(200).json(curriculums);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }               
        }
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const curriculums = await this.CurriculumRepository.findAll();
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
            await this.CurriculumRepository.activateOrDeactivate(id);
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
            await this.CurriculumRepository.update(id, curriculum);
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
            await this.CurriculumRepository.delete(id);
            res.status(200).json({ message: 'Curriculum deleted successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }       
    }
    }
    }