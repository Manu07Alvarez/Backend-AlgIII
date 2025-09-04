import { validateRepo } from '../decorators/errors/errors.js';
import  type { Reporte ,PrismaClient } from '../generated/prisma/client.js';
import { ReporteDTO } from 'schemas/Reportes.schemas.js';
import Repository from './Repository.js';
import IReportsRepository from './interfaces/IReportsRepository.js';
export class ReportsRepository extends Repository<Reporte> implements IReportsRepository {
    constructor (
        private readonly Reporte: PrismaClient['reporte'],
    ){super(Reporte)}



    @validateRepo
    async create(data: ReporteDTO): Promise<void> {
        await this.entity.create(data.descripcion);
    }
}
