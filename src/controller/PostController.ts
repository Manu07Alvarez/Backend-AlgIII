import IPostService from "../services/interfaces/IPostService.js";
import { Request, Response } from "express";
import { trace } from '@opentelemetry/api';
import { Post } from "schemas/Post.schemas.js";
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';

const tracer = trace.getTracer('controller');

export class PostController {
    constructor(private readonly PostService: IPostService) {}

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const post: Post = req.body;
            await this.PostService.update(id, post);
            res.status(200).json({ message: 'Post updated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.PostService.activateOrDeactivate(id);
            res.status(200).json({ message: 'Post state updated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const post = req.body;
            await this.PostService.create(post);
            res.status(201).json({ message: 'Post created successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const posts = await this.PostService.findAll();
            res.status(200).json(posts);
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async findById(req: Request, res: Response): Promise<void> {
        try {
            const post = await this.PostService.findById(Number(req.params.id));
            res.status(200).json(post);
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async findByTitle(req: Request, res: Response): Promise<void> {
        try {
            const post = await this.PostService.findByTitle(req.params.title);
            res.status(200).json(post);
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.PostService.delete(id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async getPagination(req: Request, res: Response): Promise<Response> {
        try {
            const { page = 1, limit = 10 } = req.query;

            const params: PaginationParams = {
                page: Number(page),
                limit: Number(limit),
            };

            const result = await this.PostService.getPagination(params);

            return res.status(200).json(result);
        } catch (error: unknown) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Error desconocido" });
        }
    }
}
