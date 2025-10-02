import { validateRepo } from '../decorators/errors/errors.js'
import { PostReportesDTO, GetReportesDTO } from '../schemas/Reportes.schemas.js'
import { PostsReportesDTO, TemasReportesDTO, UsuariosReportesDTO, MensajesReportesDTO } from '../types/DTOs/ReportesDTO.js'
import IReportsRepository from './interfaces/IReportsRepository.js'
import { Reporte } from 'db'
import { DB } from '../generated/prisma/types.js'
import { Kysely } from 'kysely'

export class ReportsRepository implements IReportsRepository {
    constructor (
        private readonly db: Kysely<DB>,
    ){}

    @validateRepo
    async create(data: PostReportesDTO): Promise<void> {
        const key = `${data.type}_id` as "tema_id" | "post_id" | "mensaje_id" | "usuario_id"
        await this.db
            .insertInto('Reporte')
            .values({
                descripcion: data.descripcion,
                id_reportador: data.id_reportador,
                [key]: data.id_type,
            })
            .execute()
    }

    @validateRepo
    async delete(id: string): Promise<void> {
        await this.db
            .deleteFrom('Reporte')
            .where('id', '=', id)
            .execute()
    }

    @validateRepo
    async findById(id: string): Promise<Reporte> {
        return await this.db
            .selectFrom('Reporte')
            .selectAll()
            .where('id', '=', id)
            .$castTo<Reporte>()
            .executeTakeFirstOrThrow()
        
    }

    @validateRepo
    async findAll(): Promise<GetReportesDTO[]> {
        const data = await this.db
            .selectFrom('Reporte')
            .select([
                'id',
                'descripcion',
                'resuelto',
                'id_reportador',
                'usuario_id',
                'mensaje_id',
                'post_id',
                'tema_id',
            ])
            .execute()

        return data.map(r => {
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
    }

    @validateRepo
    async resolve(id: string): Promise<void> {
        await this.db
            .updateTable('Reporte')
            .set({ resuelto: true })
            .where('id', '=', id)
            .execute()
    }

    @validateRepo
    async deresolve(id: string): Promise<void> {
        await this.db
            .updateTable('Reporte')
            .set({ resuelto: false })
            .where('id', '=', id)
            .execute()
    }

    @validateRepo
    async findAllMessages(): Promise<MensajesReportesDTO[]> {
        return await this.db
            .selectFrom('Reporte')
            .innerJoin('Mensaje', 'Mensaje.id', 'Reporte.mensaje_id')
            .select([
                'Mensaje.id',
                'Mensaje.contenido',
                'Mensaje.id_post',
                'Mensaje.id_autor',
                'Mensaje.createdAt',
                'Mensaje.updatedAt',
            ])
            .execute()
    }

    @validateRepo
    async findAllPosts(): Promise<PostsReportesDTO[]> {
        return await this.db
            .selectFrom('Reporte')
            .innerJoin('Post', 'Post.id', 'Reporte.post_id')
            .select([
                'Post.id',
                'Post.titulo',
                'Post.contenido',
                'Post.published',
                'Post.id_autor',
                'Post.id_tema'
            ])
            .execute()
    }

    @validateRepo
    async findAllTopics(): Promise<TemasReportesDTO[]> {
        return await this.db
            .selectFrom("Reporte")
            .innerJoin("Tema", "Tema.id", "Reporte.tema_id")
            .select([
                'Tema.id',
                'Tema.titulo',
                'Tema.id_creador',
                'Tema.contenido',
                'Tema.createdAt',
                'Tema.updatedAt',
                'Tema.fijado',
                'Tema.cerrado',
                'Tema.id_carrera',
                'Tema.nombre'
            ])
            .execute()
    }

    @validateRepo
    async findAllUsers(): Promise<UsuariosReportesDTO[]> {
        return await this.db
            .selectFrom('Reporte')
            .innerJoin('Usuario', 'Usuario.id', 'Reporte.usuario_id')
            .select([
                'Usuario.id',
                'Usuario.nombre_apellido',
                'Usuario.email',
                'Usuario.rol',
                'Usuario.activo'
            ])
            .execute()
    }
}