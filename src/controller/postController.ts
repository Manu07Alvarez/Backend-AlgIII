import {IpostService} from "../services/postService.Interface.ts";
import { Request, Response } from "express";
import { trace, Span } from '@opentelemetry/api';
const tracer = trace.getTracer('controlleer');

export class PostController {
    constructor(
        private readonly PostService: IpostService
    ){}

    public async getPostAll(req: Request, res: Response): Promise<void> {
        try {
            const posts = await this.PostService.getPostAll();
            res.status(200).json(posts);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async getPostId(req: Request, res: Response): Promise<void> {
        try {
            const post = await this.PostService.getPostId(Number(req.params.id));
            res.status(200).json(post);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async getPostName(req: Request, res: Response): Promise<void> {
        try {
            const post = await this.PostService.getPostName(req.params.name);
            res.status(200).json(post);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async crearPost(req: Request, res: Response): Promise<void> {
        try {
            const post = req.body;
            await this.PostService.crearPost(post);
            res.status(201).json({ message: 'Post created successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async bajaPost(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.PostService.bajaPost(id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const post = req.body;
            await this.PostService.update(post.id, post);
            res.status(200).json({ message: 'Post updated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
}
