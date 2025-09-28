import { validateRepo } from '../decorators/errors/errors.js';
import  type { Post, PrismaClient } from '../generated/prisma/client.js';
import Repository from './Repository.js';
import IPostRepository from './interfaces/IPostRepository.js';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';

export class PostRepository extends Repository<Post> implements IPostRepository {
    constructor (
        private readonly Post: PrismaClient['post'],
    ){super(Post)}

    @validateRepo
    async findByTitle(title: string): Promise<Partial<Post[]>> {
        return this.Post.findMany({
            where: { 
                titulo: {
                    contains: title, 
                }, 
            },
        });
    }

    public async getPagination({page, limit}: PaginationParams): Promise<PaginationResults<Post>> {
        const offset = (page - 1) * limit;
    
        const [data, total] = await Promise.all([
          this.Post.findMany({ skip: offset, take: limit }),
          this.Post.count()
        ]);
    
        return {
          data,
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: page
        }
      }
}
