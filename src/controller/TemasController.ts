import { TemaService } from "services/TemasService.ts";
import { Request, Response, NextFunction } from "express";
import {trace, Span} from '@opentelemetry/api';
const tracer = trace.get.tracer('controller');

export class temasController {
    constructor(
        private readonly TemasService: TemaService
    ){}

    public async getTemaAll(req: Request, res: Response): Promise<void> {
        try{
            const temas = await this.TemasService.getTemaAll();
            res.status(200).json(temas);
        }catch (error: unknown){
            if(error instanceof Error) {
                res.status(500).json({message: error.message});
            }
        }
    }

    public async getTemaId(req: Request, res:Response): Promise<void> {
        try {
            const temas = await this.TemasService.getTemaId(Number(req.params.id));
            res.status(200).json(temas);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({message: error.message});
            }
        }
    }

    public async getTemaName(req:Request, res: Response): Promise<void> {
        try{
            const tema = await this.TemasService.getTemaName(req.params.name)
            res.status(200).json(tema);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({message: error.message});
            }
        }
    }

    public async crearTema(req:Request, res: Response): Promise<void>{
        try {
            const tema = req.body;
            await this.TemasService.crearTema(tema)
            res.status(201).json({message: 'Tema created successfully'});
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({message: error.message});
            }
        }
    }

    public async bajaTema(req:Request, res: Response): Promise<void> {
        try
    }
}