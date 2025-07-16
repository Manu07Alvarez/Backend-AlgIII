import IPostService from "../services/interfaces/IPostService.ts";
import { Request, Response } from "express";
import { trace, Span } from '@opentelemetry/api';
const tracer = trace.getTracer('controlleer');

export class PostController {
    constructor(
        private readonly PostService: IPostService
    ){}

   public async update(req: Request, res: Response): Promise<void> {
            try {
                const id = Number(req.params.id);
                const post = req.body;
                await this.PostService.update(id, post);
                res.status(200).json({ message: 'Post updated successfully' });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
            try {
                const id = Number(req.params.id);
                await this.PostService.activateOrDeactivate(id);
                res.status(200).json({ message: 'Post state updated successfully' });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async create(req: Request, res: Response): Promise<void> {
            try {
                const post = req.body;
                await this.PostService.create(post);
                res.status(201).json({ message: 'Post created successfully' });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async findAll(req: Request, res: Response): Promise<void> {
            try {
                const post = await this.PostService.findAll();
                res.status(200).json(post);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async findById(req: Request, res: Response): Promise<void> {
            
            try {
                const post = await this.PostService.findById(Number(req.params.id));
                res.status(200).json(post);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
    
        public async findByName(req: Request, res: Response): Promise<void> {
            try {
                const post = await this.PostService.findByName(req.params.name);
                res.status(200).json(post);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }

        public async delete(req: Request, res: Response): Promise<void> {
            try {
                const id = Number(req.params.id);
                await this.PostService.delete(id);
                res.status(200).json({ message: 'Tema deleted successfully' });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        }
}

