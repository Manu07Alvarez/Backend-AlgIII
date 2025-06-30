

import IMensajesService from "../services/interfaces/IMensajesService.ts";
import { Request, Response } from "express";
import { trace} from '@opentelemetry/api';
import { Mensaje } from "../prisma/client.ts";
const tracer = trace.getTracer('controlleer');

export class MensajesController {
    constructor(
        private readonly MensajesService: IMensajesService
    ){}

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const mensajes = req.body;
            await this.MensajesService.update(id, mensajes);
            res.status(200).json({ message: 'Mensaje updated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.MensajesService.activateOrDeactivate(id);
            res.status(200).json({ message: 'Mensaje state updated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const mensajes = {
                id_autor: Number(req.body.id_autor),
                id_post: Number(req.body.id_post),
                contenido: req.body.contenido,
                id_mensaje: req.body.id_mensaje || null, // Optional field for responding to another message
            } as Mensaje
            await this.MensajesService.create(mensajes);
            res.status(201).json({ message: 'Mensaje created successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const mensajes = await this.MensajesService.findAllInPost(Number(req.params.postId));
            res.status(200).json(mensajes);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findById(req: Request, res: Response): Promise<void> {
        
        try {
            const mensajes = await this.MensajesService.findById(Number(req.params.id));
            res.status(200).json(mensajes);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findAllInUserId(req: Request, res: Response): Promise<void> {
        try {
            const mensajes = await this.MensajesService.findAllInUserId(Number(req.params.userId));
            res.status(200).json(mensajes);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.MensajesService.delete(id);
            res.status(200).json({ message: 'Mensaje deleted successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
    public async findAllInPost(req: Request, res: Response): Promise<void> {
        try {
            const postId = Number(req.params.postId);
            const mensajes = await this.MensajesService.findAllInPost(postId);
            res.status(200).json(mensajes);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

}