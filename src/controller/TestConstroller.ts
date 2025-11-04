
import { Request, Response } from "express";
import { trace} from '@opentelemetry/api';
import IReportsService from "../services/interfaces/IReportsService.js";
import { PostReportesDTO } from "../schemas/Reportes.schemas.js";
import { DB } from "db/types.js";
import { Kysely } from "kysely";

export class TestController {
    constructor(
        private readonly db: Kysely<DB>,
    ){}

    public async findAllTopics(req: Request, res: Response): Promise<void> {
        try {
            const topics =  await this.db
                .selectFrom("Reporte")
                .innerJoin("Tema", "Tema.id", "Reporte.tema_id")
                .select([
                    "Tema.id",
                    "Tema.titulo",
                    "Tema.id_creador",
                    "Tema.contenido",
                    "Tema.createdAt",
                    "Tema.updatedAt",
                    "Tema.fijado",
                    "Tema.cerrado",
                    "Tema.id_carrera",
                    "Tema.nombre"
                ])
                .execute();
            res.status(200).json(topics);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ status: 500, error: error.stack, message: error.message });
            }
        }
    }

}