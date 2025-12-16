import { validateRepo } from '../decorators/errors/errors.js';
import { Post, Prisma, PrismaClient } from 'db';
import Repository from './Repository.js';
import IPostRepository from './interfaces/IPostRepository.js';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';
import { getAuth } from '../utils/context/AuthUserContext.js';

export class PostRepository extends Repository<Post, "post"> implements IPostRepository {

    constructor() {
        super("post");
    }
    

    @validateRepo
    async findByTitle(title: string): Promise<Partial<Post[]>> {
      return await super["db"].findMany({
				where: { 
					titulo: { 
						contains: title,
						mode: Prisma.QueryMode.insensitive
				}},
      });
    }

    @validateRepo
    public async like(id: number): Promise<void> {
      await super["db"].update({
        where: { id },
        data: { likes: { increment: 1 } },
      });
	  }

    @validateRepo
    public async getPagination(
        params: PaginationParams & { search?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }
    ): Promise<PaginationResults<Post>> {
        const { page, limit, search, sortBy, sortOrder } = params;
        const offset = (page - 1) * limit;

        const where = search
            ? { OR: [{ titulo: { contains: search } }, { contenido: { contains: search } }] }
            : {};

        const orderBy = sortBy ? { [sortBy]: sortOrder ?? 'asc' } : undefined;

        const [data, total] = await Promise.all([
            super["db"].findMany({ skip: offset, take: limit, where, orderBy }),
            super["db"].count({ where })
        ]);

        return {
            data,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
}
