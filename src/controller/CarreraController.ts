import {  ICarreraService } from "../services/CarreraService.Interface";
import { Request, Response } from "express";

export class CarreraController {
    constructor(
        private readonly CarreraService: ICarreraService
    ){}

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const carrera = req.body;
            await this.CarreraService.update(id, carrera);
            res.status(200).json({ message: 'Carrera updated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.CarreraService.activateOrDeactivate(id);
            res.status(200).json({ message: 'Carrera state updated successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const carrera = req.body;
            await this.CarreraService.create(carrera);
            res.status(201).json({ message: 'Carrera created successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const carreras = await this.CarreraService.findAll();
            res.status(200).json(carreras);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findById(req: Request, res: Response): Promise<void> {
        try {
            const carrera = await this.CarreraService.findById(Number(req.params.id));
            res.status(200).json(carrera);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findByName(req: Request, res: Response): Promise<void> {
        try {
            const carrera = await this.CarreraService.findByName(req.params.name);
            res.status(200).json(carrera);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

}