import ITemasService from "../services/interfaces/ITemaService.js";
import { Request, Response, NextFunction } from "express";
import {trace, Span} from '@opentelemetry/api';
import { Tema } from "../schemas/Tema.schema.js";
import { errorResponse } from "../decorators/errors/errors.js";
//import { Tema } from "../generated/prisma/client.js"

export class TemasController {
    constructor(
        private readonly TemasService: ITemasService
    ){}
    
    @errorResponse
    public async update(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        const tema: Tema = req.body;
        await this.TemasService.update(id, tema);
        res.status(200).json({ message: 'Tema updated successfully' });
    }
    
    @errorResponse
    public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        await this.TemasService.activateOrDeactivate(id);
        res.status(200).json({ message: 'Tema state updated successfully' });
    }
    
    @errorResponse
    public async create(req: Request, res: Response): Promise<void> {
        const tema : Tema = req.body;
        await this.TemasService.create(tema);
        res.status(201).json({ message: 'Tema created successfully' });
    }

    @errorResponse
    public async findAll(req: Request, res: Response): Promise<void> {
        const Tema = await this.TemasService.findAll();
        res.status(200).json(Tema);
    }
    
    @errorResponse
    public async findById(req: Request, res: Response): Promise<void> {
        const tema = await this.TemasService.findById(Number(req.params.id));
        res.status(200).json(tema);
    }
    
    @errorResponse
    public async findByName(req: Request, res: Response): Promise<void> {
        const tema = await this.TemasService.findByName(req.params.name);
        res.status(200).json(tema);
    }

    @errorResponse
    public async delete(req: Request, res: Response): Promise<void> {
        const id = Number(req.params.id);
        await this.TemasService.delete(id);
        res.status(200).json({ message: 'Tema deleted successfully' });
    }

    @errorResponse
    public async obtenerTemasAbiertos(req: Request, res: Response, ): Promise<void> {
        const tema = await this.TemasService.obtenerTemasAbiertos();
        res.status(200).json(tema);
    }   
}