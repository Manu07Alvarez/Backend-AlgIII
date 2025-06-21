import Repository from "./Repository.ts";
import { PrismaClient, Mensaje } from '../../generated/prisma/client.js';
import { validateRepo } from "../decorators/errors/errors.ts";
import IMensajesRepository from "./interfaces/IMensajesRepository.ts";

export default class MensajesRepository extends Repository<Mensaje> implements IMensajesRepository<Mensaje> {
  constructor(
    private readonly mensajes: PrismaClient['mensaje'],
  ) {
    super(mensajes);
  }

  @validateRepo
  public async findByUserId(userId: number, postId: number): Promise<Mensaje[]> {
    return this.entity.findMany({
			where: { 
				id_autor: userId,
				id_post: postId 
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