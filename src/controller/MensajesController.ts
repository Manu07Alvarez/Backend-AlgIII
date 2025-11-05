

import IMensajesService from "../services/interfaces/IMensajesService.js";
import { Request, Response } from "express";
import { trace} from '@opentelemetry/api';
import { Mensaje } from "../schemas/Mensajes.schemas.js";
import { errorResponse } from "decorators/errors/errors.js";

export class MensajesController {
	constructor(
			private readonly MensajesService: IMensajesService
	){}

	@errorResponse
	public async update(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const mensajes: Mensaje = req.body;
		await this.MensajesService.update(id, mensajes);
		res.status(200).json({ message: 'Mensaje updated successfully' });
	}

	@errorResponse
	public async activateOrDeactivate(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		await this.MensajesService.activateOrDeactivate(id);
		res.status(200).json({ message: 'Mensaje state updated successfully' });
	}

	@errorResponse
	public async create(req: Request, res: Response): Promise<void> {
		const mensajes: Mensaje = req.body;
		await this.MensajesService.create(mensajes);
		res.status(201).json({ message: 'Mensaje created successfully' });
	}

	@errorResponse
	public async findById(req: Request, res: Response): Promise<void> {
		const mensajes = await this.MensajesService.findById(Number(req.params.id));
		res.status(200).json(mensajes);
	}

	@errorResponse
	public async findAllInUserId(req: Request, res: Response): Promise<void> {
		const mensajes = await this.MensajesService.findAllInUserId(Number(req.params.userId));
		res.status(200).json(mensajes);
	}

	public async delete(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		await this.MensajesService.delete(id);
		res.status(200).json({ message: 'Mensaje deleted successfully' });
	}
	public async findAllInPost(req: Request, res: Response): Promise<void> {
		const postId = Number(req.params.id);
		const mensajes = await this.MensajesService.findAllInPost(postId);
		res.status(200).json(mensajes);
	}

}