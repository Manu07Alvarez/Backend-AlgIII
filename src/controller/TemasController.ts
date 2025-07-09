import { ItemasService } from "services/interfaces/temaService.interface.ts";
import { Request, Response, NextFunction } from "express";
import {trace, Span} from '@opentelemetry/api';
const tracer = trace.getTracer('controller');

export class temasController {
    constructor(
        private readonly TemasService: ItemasService
    ){}

     public async update(req: Request, res: Response): Promise<void> {
            try {
                const id = Number(req.params.id);
                const tema = req.body;
                await this.TemasService.update(id, tema);
                res.status(200).json({ message: 'Tema updated successfully' });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
            try {
                const id = Number(req.params.id);
                await this.TemasService.activateOrDeactivate(id);
                res.status(200).json({ message: 'Tema state updated successfully' });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async create(req: Request, res: Response): Promise<void> {
            try {
                const Tema = req.body;
                await this.TemasService.create(Tema);
                res.status(201).json({ message: 'Tema created successfully' });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async findAll(req: Request, res: Response): Promise<void> {
            try {
                const Tema = await this.TemasService.findAll();
                res.status(200).json(Tema);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async findById(req: Request, res: Response): Promise<void> {
            
            try {
                const tema = await this.TemasService.findById(Number(req.params.id));
                res.status(200).json(tema);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async findByName(req: Request, res: Response): Promise<void> {
            try {
                const tema = await this.TemasService.findByName(req.params.name);
                res.status(200).json(tema);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }

        public async delete(req: Request, res: Response): Promise<void> {
            try {
                const id = Number(req.params.id);
                await this.TemasService.delete(id);
                res.status(200).json({ message: 'Tema deleted successfully' });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
}