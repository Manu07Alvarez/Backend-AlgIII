import { validateRepo } from "../decorators/errors/errors";
import { temasRepositories } from "../repositories/TemasRepositories";
import { TemaService } from "../services/TemasService";
import { Request, Response, NextFunction } from "express";

export class TemasController {
    private temaService: TemaService;

    constructor() {
        this.temaService = new TemaService();
    }
    
    async getTema(req: Request, res: Response, next: NextFunction) {
        try {
            const temas = await this.temaService.getTema();
            res.status(200).json(temas);
        } catch (error) {
            next(error);
        }
    }

    async BajaTema(req: Request, res: Response, next: NextFunction){
        try{
            await this.temaService.BajaTema();
        } catch (err) {
            
        }      
    }
    }
