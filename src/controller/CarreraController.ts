
import {  ICarreraService } from "../services/interfaces/ICarreraService.js";
import { Request, Response } from "express";
import { trace} from '@opentelemetry/api';
import { Carrera } from "../schemas/Carreras.schemas.js";
import { errorResponse } from "../decorators/errors/errors.js";

export class CarreraController {
	constructor(
		private readonly CarreraService: ICarreraService
	){}

	@errorResponse
	public async update(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const carrera: Partial<Carrera> = req.body;
		await this.CarreraService.update(id, carrera);
		res.status(200).json({ message: 'Carrera updated successfully' });
			// #swagger.autoBody = true 
	}

	@errorResponse
	public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		await this.CarreraService.activateOrDeactivate(id);
		res.status(200).json({ message: 'Carrera state updated successfully' });
	}

	@errorResponse
	public async create(req: Request, res: Response): Promise<void> {
		const carrera: Carrera = req.body;
		await this.CarreraService.create(carrera);
		res.status(201).json({ message: 'Carrera created successfully' });
	}

	@errorResponse
	public async findAll(req: Request, res: Response): Promise<void> {
		const carreras = await this.CarreraService.findAll();
		res.status(200).json(carreras);
	}

	@errorResponse
	public async findById(req: Request, res: Response): Promise<void> {
		const carrera = await this.CarreraService.findById(Number(req.params.id));
		res.status(200).json(carrera);
	}

	@errorResponse
	public async findByName(req: Request, res: Response): Promise<void> {
		const carrera = await this.CarreraService.findByName(req.params.name);
		res.status(200).json(carrera);
	}

}