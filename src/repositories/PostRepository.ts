import { validateRepo } from '../decorators/errors/errors.js';
import  type { Post, PrismaClient } from 'db';
import Repository from './Repository.js';
import IPostRepository from './interfaces/IPostRepository.js';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';

export class PostRepository extends Repository<Post> implements IPostRepository {
    constructor (
        private readonly Post: PrismaClient['post'],
    ){super(Post)}

    @validateRepo
    async findByTitle(title: string): Promise<Partial<Post[]>> {
        return await this.Post.findMany({
            where: { 
                titulo: {
                    contains: title, 
                }, 
            },
        });
    }

    public async getPagination(params: { page: number; limit: number; search?: string; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<{ data: Post[]; total: number; page: number; limit: number }> {
        const { page, limit, search, sortBy, sortOrder } = params;
        const offset = (page - 1) * limit;

        const where = search
            ? {
                OR: [
                    { titulo: { contains: search } },
                    { contenido: { contains: search } }
                ]
            }
            : {};

        const orderBy = sortBy
            ? { [sortBy]: sortOrder ?? "asc" }
            : undefined;

        const [data, total] = await Promise.all([
            this.Post.findMany({
                skip: offset,
                take: limit,
                where,
                orderBy
            }),
            this.Post.count({ where })
        ]);

        return {
            data,
            total,
            page,
            limit
        };
    }
}
