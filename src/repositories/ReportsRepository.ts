import { validateRepo } from '../decorators/errors/errors.js'
import { Reporte ,PrismaClient } from 'db'
import { MensajesReportesDTO, TemasReportesDTO, PostsReportesDTO, UsuariosReportesDTO, PostReportesDTO, GetReportesDTO} from 'schemas/Reportes.schemas.js'
import IReportsRepository from './interfaces/IReportsRepository.js'
import { DB } from '../generated/prisma/types.js'
import { Kysely } from 'kysely'

export class ReportsRepository implements IReportsRepository {
    constructor (
        private readonly db: Kysely<DB>,
        private readonly Reporte: PrismaClient['reporte'],
    ){}

    @validateRepo
    async create(data: PostReportesDTO): Promise<void> {
        const key = `${data.type}_id` as "tema_id" | "post_id" | "mensaje_id" | "usuario_id"
        await this.Reporte.create({
            data: {
                descripcion: data.descripcion,
                id_reportador: data.id_reportador,
                [key]: data.id_type,
            }
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
    async findAll(): Promise<GetReportesDTO[]> {
        const data = await this.Reporte.findMany({
            select: {
                id: true,
                descripcion: true,
                resuelto: true,
                id_reportador: true,
                usuario_id: true,
                mensaje_id: true,
                post_id: true,
                tema_id: true,
            }
        })
        return data.map(r => {
// filtramos los nulos y devolvemos solo el que tiene valor
            const relaciones = Object.fromEntries(
            Object.entries({
                usuario_id: r.usuario_id,
                mensaje_id: r.mensaje_id,
                post_id: r.post_id,
                tema_id: r.tema_id,
            }).filter(([_, v]) => v !== null)
            )

            return {
            id: r.id,
            descripcion: r.descripcion,
            resuelto: r.resuelto,
            id_reportador: r.id_reportador,
            ...relaciones
            }
        })
    };

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
    };

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
    async findAllMessages(): Promise<MensajesReportesDTO[]> {
        return await this.db.selectFrom('Reporte')
            .where('Reporte.mensaje_id', '!=', null)
            .innerJoin('Mensaje', 'Mensaje.id', 'Reporte.mensaje_id')
            .$castTo<MensajesReportesDTO>()
            .execute()
    };

    @validateRepo
    async findAllPosts(): Promise<PostsReportesDTO[]> {
        await console.log('findAllPosts');
        return await this.db.selectFrom('Reporte')
            .where('Reporte.post_id', '!=', null)
            .innerJoin('Post', 'Post.id', 'Reporte.post_id')
            .$castTo<PostsReportesDTO>()
            .execute()
    }

    @validateRepo
    async findAllTopics(): Promise<TemasReportesDTO[]> {
        return await this.db.selectFrom('Reporte')
            .where('Reporte.tema_id', '!=', null)
            .innerJoin('Tema', 'Tema.id', 'Reporte.tema_id')
            .$castTo<TemasReportesDTO>()
            .execute()
    };

    @validateRepo
    async findAllUsers(): Promise<UsuariosReportesDTO[]> {
        return await this.db.selectFrom('Reporte')
            .where('Reporte.usuario_id', '!=', null)
            .innerJoin('Usuario', 'Usuario.id', 'Reporte.usuario_id')
            .$castTo<UsuariosReportesDTO>()
            .execute()
    };
}
