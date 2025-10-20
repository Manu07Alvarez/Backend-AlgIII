import Repository from "./Repository.js";
import { PrismaClient, Mensaje, Usuario } from 'db';
import { validateRepo } from "../decorators/errors/errors.js";
import IMensajesRepository from "./interfaces/IMensajesRepository.js";
import { GetMensajeForRolDTO, NestedMessage } from "types/DTOs/MensajesDTO.js";
import { Kysely } from "kysely";
import { DB } from "db/types.js";
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres'
import { sql } from "kysely";

export default class MensajesRepository extends Repository<Mensaje, "mensaje"> implements IMensajesRepository {
  constructor(
	private readonly dbK: Kysely<DB>,
  ) {
    super("mensaje");
  }

  	@validateRepo
	public async findAllInPost(postId: number): Promise<NestedMessage[]> {
		console.log(postId);
		const messages = await this.dbK
			.selectFrom('Mensaje as m')
			.select((eb) =>[
				'm.id',
				'm.id_mensaje',
				'm.updatedAt',
				'm.id_post',
				'm.id_autor',
				'm.contenido',
				'm.createdAt',
				jsonObjectFrom(
					eb.selectFrom("Usuario as u")
					.select([
						'u.activo',
						'u.email',
						'u.id',
						'u.nombre_apellido',
						'u.rol',
						'u.updatedAt',
						'u.createdAt',
					])
					.whereRef('u.id', '=', 'm.id_autor')
				).$notNull().as('autor'),
			])
			.where('m.id_post', '=', postId)
			.orderBy('m.createdAt', 'asc')
			.execute().then((msgs) => msgs.map((msg) => ({
				...msg,
				autor: {
					...msg.autor,
					createdAt: msg .autor.createdAt ? new Date(msg.autor.createdAt) : null,
					updatedAt: msg.autor.updatedAt ? new Date(msg.autor.updatedAt) : null,
				},
			})));
		const map = new Map<number, NestedMessage>();
		const roots: NestedMessage[] = [];
		
		for (const msg of messages) {
			const nodo: NestedMessage = {
				...msg,
				respuestas: [],
			};
			map.set(msg.id, nodo);
			if (msg.id_mensaje) {
				const parent = map.get(msg.id_mensaje);
				if (parent) parent.respuestas.push(nodo);
				else roots.push(nodo); 
			} else {
				roots.push(nodo);
			}
		}
		return roots;
	}

  @validateRepo
  public async messagesResponded(messageId: number): Promise<Partial<Mensaje[]>> {
	return super["db"].findMany({
		where: {
			id_mensaje: messageId,
		},
	});
}

  @validateRepo
  public async findAllInUserId(userId: number): Promise<Mensaje[]> {
    return super["db"].findMany({
		where: { 
			id_autor: userId,
			},
		orderBy: { createdAt: 'asc' },
    });
  }
}