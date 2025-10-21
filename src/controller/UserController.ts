import { Usuario } from '../generated/prisma/client.js';
import { Request, Response } from 'express';
import { IUserService } from '../services/interfaces/IUserService.js';
import { PaginationParams, PaginationResults } from '../types/pagination.types.js';

export class UserController {
    constructor(private readonly userService: IUserService) {}

    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.findAllUsers();
            res.status(200).json(users);
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.findById(Number(req.params.id));
            res.status(200).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, contrasenia } = req.body;
            const jwt = await this.userService.login(email, contrasenia);
            res.cookie('auth_token', jwt);
            res.status(200).json({ message: 'Login successful' });
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const user: Usuario = req.body;
            await this.userService.register(user);
            res.status(201).json({ message: 'User created successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async deactivate(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const userData: Partial<Usuario> = req.body;
            await this.userService.bajaUsuario(id, userData as Usuario);
            res.status(200).json({ message: 'User deactivated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const user: Usuario = req.body;
            await this.userService.update(id, user);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }

    public async getPagination(req: Request, res: Response): Promise<void> {
        try {
            const { page = 1, limit = 10, search, sortBy, sortOrder } = req.query;

            const params: PaginationParams & { search?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' } = {
                page: Number(page),
                limit: Number(limit),
                search: search as string | undefined,
                sortBy: sortBy as string | undefined,
                sortOrder: sortOrder as 'asc' | 'desc' | undefined
            };
            const result: PaginationResults<Partial<Usuario>> = await this.userService.getPagination(params);
            res.status(200).json(result);
        } catch (error: unknown) {
            if (error instanceof Error) res.status(500).json({ message: error.message });
        }
    }
}
