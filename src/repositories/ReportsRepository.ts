import { validateRepo } from '../decorators/errors/errors.js';
import  type { Reporte ,PrismaClient } from '../generated/prisma/client.js';
import { MensajeReporteDTO, ReporteDTO } from 'schemas/Reportes.schemas.js';
import IReportsRepository from './interfaces/IReportsRepository.js';
import { Usuario } from 'schemas/Usuarios.schema.js';
import { UsuarioReportado, MensajesReportado } from 'generated/prisma/sql.js';
export class ReportsRepository implements IReportsRepository {
    constructor (
        private readonly Reporte: PrismaClient['reporte'],
        private readonly Prisma: PrismaClient,
    ){}

    @validateRepo
    async create(data: ReporteDTO): Promise<void> {
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
    async findAllPosts(): Promise<Reporte[]> {
        return await this.Reporte.findMany({
            include: {
                post: true
            }
        })
    }

    @validateRepo
    async findAllTopics(): Promise<Reporte[]> {
        return await this.Prisma.$queryRawTyped(MensajesReportado())
    }

    @validateRepo
    async findAllUsers(): Promise<MensajeReporteDTO[]> {
        return await this.Prisma.$queryRawTyped(UsuarioReportado())
        
    }
}
