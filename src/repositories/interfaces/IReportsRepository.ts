import { Reporte } from "db";
import { MensajesReportesDTO, PostsReportesDTO, PostReportesDTO, GetReportesDTO, TemasReportesDTO, UsuariosReportesDTO } from "../../schemas/Reportes.schemas.js";
export default interface IReportsRepository {
    create(data: PostReportesDTO): Promise<void>;
    findById(id: string): Promise<Partial<Reporte>>;
    findAll(): Promise<GetReportesDTO[]>;
    findAllMessages(): Promise<MensajesReportesDTO[]>;
    findAllPosts(): Promise<PostsReportesDTO[]>;
    findAllTopics(): Promise<TemasReportesDTO[]>;
    findAllUsers(): Promise<UsuariosReportesDTO[]>;
    resolve(id: string): Promise<void>;
    deresolve(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
