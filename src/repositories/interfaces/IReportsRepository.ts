import { Reporte } from "db";
import { PostReportesDTO, GetReportesDTO } from "../../schemas/Reportes.schemas.js";
import { TemasReportesDTO, MensajesReportesDTO, PostsReportesDTO, UsuariosReportesDTO } from "../../types/DTOs/ReportesDTO.js";
export default interface IReportsRepository {
    create(data: PostReportesDTO): Promise<void>;
    findById(id: string): Promise<Reporte>;
    findAll(): Promise<GetReportesDTO[]>;
    findAllMessages(): Promise<MensajesReportesDTO[]>;
    findAllPosts(): Promise<PostsReportesDTO[]>;
    findAllTopics(): Promise<TemasReportesDTO[]>;
    findAllUsers(): Promise<UsuariosReportesDTO[]>;
    resolve(id: string): Promise<void>;
    deresolve(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
