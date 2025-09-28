import { Reporte } from "../../generated/prisma/client.js";
import { MensajesReportesDTO, PostsReportesDTO, PostReportesDTO, GetReportesDTO, TemasReportesDTO, UsuariosReportesDTO } from "schemas/Reportes.schemas.js";
export default interface IReportsService {
    create(data: PostReportesDTO): Promise<void>;
    findById(id: string): Promise<Partial<Reporte>>;
    findAll(): Promise<GetReportesDTO[]>;
    findAllMessages(): Promise<MensajesReportesDTO[]>;
    findAllPosts(): Promise<PostsReportesDTO[]>;
    findAllTopics(): Promise<TemasReportesDTO[]>;
    findAllUsers(): Promise<UsuariosReportesDTO[]>;
    resolve(id: string): Promise<void>;
    deresolve(id: string): Promise<void>;
    update(id: string, data: Reporte): Promise<void>;
    delete(id: string): Promise<void>;
}
