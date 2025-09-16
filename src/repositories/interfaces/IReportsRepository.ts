import { Reporte } from "../../generated/prisma/client.js";
import { MensajeReporteDTO, MessageReporteDTO, PostReporteDTO, ReporteDTO, TemaReporteDTO } from "schemas/Reportes.schemas.js";
export default interface IReportsRepository {
    create(data: ReporteDTO): Promise<void>;
    findById(id: string): Promise<Partial<Reporte>>;
    findAll(): Promise<Reporte[]>;
    findAllMessages(): Promise<MessageReporteDTO[]>;
    findAllPosts(): Promise<PostReporteDTO[]>;
    findAllTopics(): Promise<TemaReporteDTO[]>;
    findAllUsers(): Promise<MensajeReporteDTO[]>;
    resolve(id: string): Promise<void>;
    deresolve(id: string): Promise<void>;
    update(id: string, data: Reporte): Promise<void>;
    delete(id: string): Promise<void>;
}
