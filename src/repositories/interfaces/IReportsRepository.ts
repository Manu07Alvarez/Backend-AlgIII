import { Reporte } from "../../generated/prisma/client.js";
import { ReporteDTO } from "schemas/Reportes.schemas.js";
export default interface IReportsRepository {
    create(data: ReporteDTO): Promise<void>;
    findById(id: string): Promise<Partial<Reporte>>;
    findAll(): Promise<Reporte[]>;
    findAllMessages(): Promise<Reporte[]>;
    findAllPosts(): Promise<Reporte[]>;
    findAllTopics(): Promise<Reporte[]>;
    findAllUsers(): Promise<Reporte[]>;
    resolve(id: string): Promise<void>;
    update(id: string, data: Reporte): Promise<void>;
    delete(id: string): Promise<void>;
}
