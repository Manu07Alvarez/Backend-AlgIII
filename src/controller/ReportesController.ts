
import { Request, Response } from "express";
import { trace} from '@opentelemetry/api';
import IReportsService from "../services/interfaces/IReportsService.js";
import { PostReportesDTO } from "../schemas/Reportes.schemas.js";
export class ReportesController {
    constructor(
        private readonly reportsService: IReportsService
    ){}


    public async create(req: Request, res: Response): Promise<void> {
        try {
            const reporte: PostReportesDTO = req.body;
            await this.reportsService.create(reporte);
            res.status(201).json({ message: 'Reporte created successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await this.reportsService.findAll());
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findById(req: Request, res: Response): Promise<void> {
        try {
            const reporte = await this.reportsService.findById(String(req.params.id));
            res.status(200).json(reporte);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findAllMessages(req: Request, res: Response): Promise<void> {
        try {
            const messages = await this.reportsService.findAllMessages();
            res.status(200).json(messages);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await this.reportsService.findAllPosts();
            res.status(200).json(posts);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async findAllTopics(req: Request, res: Response): Promise<void> {
        try {
            const topics = await this.reportsService.findAllTopics();
            res.status(200).json(topics);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
    public async findAllUsers(req: Request, res: Response): Promise<void> {
        try {
            console.log('A1');
            const users = await this.reportsService.findAllUsers();
            res.status(200).json(users);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async resolveReport(req: Request, res: Response): Promise<void> {
        try {
            const id = String(req.params.id);
            await this.reportsService.resolve(id);
            res.status(200).json({ message: 'Report resolved successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }

    public async deresolveReport(req: Request, res: Response): Promise<void> {
        try {
            const id = String(req.params.id);
            await this.reportsService.deresolve(id);
            res.status(200).json({ message: 'Report deresolved successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
}