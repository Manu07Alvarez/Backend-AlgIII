import { validateRepo } from 'decorators/errors/errors.js';
import  type { Post, PrismaClient } from '../generated/prisma/client.js';
import Repository from './Repository.js';
import IPostRepository from './interfaces/IPostRepository.js';

export class PostRepository extends Repository<Post> implements IPostRepository {
    constructor (
        private readonly Post: PrismaClient['post'],
    ){super(Post)}
}
