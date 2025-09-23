import { validateRepo } from '../decorators/errors/errors.js';
import  type { Reporte ,PrismaClient } from '../generated/prisma/client.js';
import { MensajesReportesDTO, TemasReportesDTO, PostsReportesDTO, UsuariosReportesDTO, ReportesDTO} from 'schemas/Reportes.schemas.js';
import IReportsRepository from './interfaces/IReportsRepository.js';
import { UsuariosReportados, MensajesReportados, PostsReportados, TemasReportados } from 'generated/prisma/sql.js';
export class ReportsRepository implements IReportsRepository {
    constructor (
        private readonly Reporte: PrismaClient['reporte'],
        private readonly Prisma: PrismaClient,
    ){}

    @validateRepo
    async create(data: ReportesDTO): Promise<void> {
         const key = `${data.type}_id` as "tema_id" | "post_id" | "mensaje_id"
        await this.Reporte.create({
            data: {
                descripcion: data.descripcion,
                id_reportador: data.id_reportador,
                [key]: data.id_type,
            }
        });                                                                                                             
    }

    @validateRepo
    async update(id: string, data: Reporte): Promise<void> {
        await this.Reporte.update({
            where: {
                id: id,
            },
            data: data
        })
    }

    @validateRepo
    async delete(id: string): Promise<void> {
        await this.Reporte.delete({
            where: {
                id: id,
            }
        })
    }

    @validateRepo
    async findById(id: string): Promise<Partial<Reporte>> {
        return await this.Reporte.findUniqueOrThrow({
            where: {
                id: id,
            }
        })
    }

    @validateRepo
    async findAll(): Promise<Reporte[]> {
        return await this.Reporte.findMany()
    }

    @validateRepo
    async resolve(id: string): Promise<void> {
        await this.Reporte.update({
            where: {
                id: id,
            },
            data: {
                resuelto: true,
            }
        })
    }

    @validateRepo
    async deresolve(id: string): Promise<void> {
        await this.Reporte.update({
            where: {
                id: id,
            },
            data: {
                resuelto: false,
            }
        })
    }

    @validateRepo
    async findAllMessages(): Promise<Reporte[]> {
        return await this.Reporte.findMany({
            include: {
                mensaje: true
            }
        })
    }

    @validateRepo
    async findAllPosts(): Promise<PostsReportesDTO[]> {
        return await this.Prisma.$queryRawTyped(PostsReportados())
    }

    @validateRepo
    async findAllTopics(): Promise<TemasReportesDTO[]> {
        return await this.Prisma.$queryRawTyped(TemasReportados())
    }

    @validateRepo
    async findAllUsers(): Promise<UsuariosReportesDTO[]> {
        return await this.Prisma.$queryRawTyped(UsuariosReportados())
        
    }
}
