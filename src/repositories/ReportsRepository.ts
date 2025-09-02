import { validateRepo } from '../decorators/errors/errors.js';
import  type { PrismaClient } from '../generated/prisma/client.js';
import { ReporteDTO } from 'schemas/Reportes.schemas.js';
import Repository from './Repository.js';
import IReportsRepository from './interfaces/IReportsRepository.js';
export class ReportsRepository extends Repository<Reporte> implements IReportsRepository {
    constructor (
        private readonly Reporte: PrismaClient['reporte'],
    ){super(Reporte)}

    @validateRepo
    async findByTitle(title: string): Promise<Partial<[]>> {
        return data = this.Reporte.findMany({
            where: { 
                titulo: {
                    contains: title, 
                }, 
            },
        });
    }
}
