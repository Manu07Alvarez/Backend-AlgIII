import { validateRepo } from '../decorators/errors/errors.js';
import  type { Post, PrismaClient } from 'db';
import Repository from './Repository.js';
import IPostRepository from './interfaces/IPostRepository.js';

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
}
