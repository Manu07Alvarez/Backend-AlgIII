import { validateRepo } from '../decorators/errors/errors.js';
import  type { Reporte ,PrismaClient } from '../generated/prisma/client.js';
import { ReporteDTO } from 'schemas/Reportes.schemas.js';
import Repository from './Repository.js';
import IReportsRepository from './interfaces/IReportsRepository.js';
export class ReportsRepository implements IReportsRepository {
    constructor (
        private readonly Reporte: PrismaClient['reporte'],
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
}
