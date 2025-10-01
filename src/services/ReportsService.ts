import { Reporte } from "db";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validateService } from "../decorators/errors/errors.js";
import IReportsRepository from "../repositories/interfaces/IReportsRepository.js";
import IReportsService  from "./interfaces/IReportsService.js";
import { GetReportesDTO, PostReportesDTO } from "../schemas/Reportes.schemas.js";
import { MensajesReportesDTO, PostsReportesDTO, TemasReportesDTO, UsuariosReportesDTO } from "../types/DTOs/ReportesDTO.js";
export class ReportsService implements IReportsService {
    constructor(
        private readonly reportsRepository: IReportsRepository,
    ) {}

    @validateService("not created")
    async create(data: PostReportesDTO): Promise<void> {
        await this.reportsRepository.create(data);
    }

    @validateService("not found")
    async findById(id: string): Promise<Partial<Reporte>> {
        return await this.reportsRepository.findById(id);
    }

    @validateService("not found")
    async findAll(): Promise<GetReportesDTO[]> {
        return await this.reportsRepository.findAll();
    }

    @validateService("not found")
    async resolve(id: string): Promise<void> {
        await this.reportsRepository.resolve(id);
    }

    @validateService("not found")
    async deresolve(id: string): Promise<void> {
        await this.reportsRepository.deresolve(id);
    }

    @validateService("not found")
    async delete(id: string): Promise<void> {
        await this.reportsRepository.delete(id);
    }

    @validateService("not found")
    async findAllMessages(): Promise<MensajesReportesDTO[]> {
        return await this.reportsRepository.findAllMessages();
    }

    @validateService("not found")
    async findAllPosts(): Promise<PostsReportesDTO[]> {
        return await this.reportsRepository.findAllPosts();
    }

    @validateService("not found")
    async findAllTopics(): Promise<TemasReportesDTO[]> {
        return await this.reportsRepository.findAllTopics();
    }

    @validateService("not found")
    async findAllUsers(): Promise<UsuariosReportesDTO[]> {
        return await this.reportsRepository.findAllUsers();
    }



}