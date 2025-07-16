import { validateRepo } from 'decorators/errors/errors.ts';
import { Post, PrismaClient } from '../prisma/client.ts';
import Repository from './Repository.ts';
import IPostRepository from './interfaces/IPostRepository.ts';

export class PostRepository extends Repository<Post> implements IPostRepository {
    constructor (
        private readonly Post: PrismaClient['post'],
    ){super(Post)}
}
