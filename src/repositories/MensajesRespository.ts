import Repository from "./Repository.js";
import { PrismaClient, Mensaje } from '../generated/prisma/client.js';
import { validateRepo } from "../decorators/errors/errors.js";
import IMensajesRepository from "./interfaces/IMensajesRepository.js";

export default class MensajesRepository extends Repository<Mensaje> implements IMensajesRepository {
  constructor(
    private readonly mensajes: PrismaClient['mensaje'],
  ) {
    super(mensajes);
  }

  public findAllInPost(postId: number): Promise<Mensaje[]>{
	return this.entity.findMany({
		where: { 
			id_post: postId,
		},
		orderBy: { createdAt: 'asc' },
		include: {
			autor: {
				select: {
				id: true,
				nombre_apellido: true,
				email: true,
				},
			},
		},
	});
  }

  @validateRepo
  public async messagesResponded(messageId: number): Promise<Mensaje[]> {
	return this.entity.findMany({
		where: {
			id_mensaje: messageId,
		},
	});
}

  @validateRepo
  public async findAllInUserId(userId: number): Promise<Mensaje[]> {
    return this.entity.findMany({
		where: { 
			id_autor: userId,
			},
		orderBy: { createdAt: 'asc' },
		include: {
			autor: {
				select: {
				id: true,
				nombre_apellido: true,
				email: true,
				},
			},
		}
    });
  }
}