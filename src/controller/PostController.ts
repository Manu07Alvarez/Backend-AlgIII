import IPostService from "../services/interfaces/IPostService.js";
import { Request, Response } from "express";
import { trace } from '@opentelemetry/api';
import { Post } from "../schemas/Post.schemas.js";
import { PaginationParams, PaginationResults } from '../types/pagination.types.js';
import { errorResponse } from "../decorators/errors/errors.js";

export class PostController {
    constructor(private readonly PostService: IPostService) {}

    @errorResponse
    public async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const post: Post = req.body;
        await this.PostService.update(id, post);
        res.status(200).json({ message: 'Post updated successfully' });
    }

    @errorResponse
    public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        await this.PostService.activateOrDeactivate(id);
        res.status(200).json({ message: 'Post state updated successfully' });
    }

    @errorResponse
    public async create(req: Request, res: Response): Promise<void> {
        const post = req.body;
        await this.PostService.create(post);
        res.status(201).json({ message: 'Post created successfully' });
    }

    @errorResponse
    public async findAll(req: Request, res: Response): Promise<void> {
        const posts = await this.PostService.findAll();
        res.status(200).json(posts);
    }

    @errorResponse
    public async findById(req: Request, res: Response): Promise<void> {
        const post = await this.PostService.findById(Number(req.params.id));
        res.status(200).json(post);
    }

    @errorResponse
    public async findByTitle(req: Request, res: Response): Promise<void> {
        const post = await this.PostService.findByTitle(req.params.title);
        res.status(200).json(post);
    }

    @errorResponse
    public async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        await this.PostService.delete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    }

    @errorResponse
    public async getPagination(req: Request, res: Response): Promise<void> {
        const { page = 1, limit = 10 } = req.query;

        const params: PaginationParams = {
            page: Number(page),
            limit: Number(limit),
        };

        const result = await this.PostService.getPagination(params);

        res.status(200).json(result);
    }
}
