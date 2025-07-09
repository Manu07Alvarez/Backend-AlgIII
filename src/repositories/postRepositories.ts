import { validateRepo } from 'decorators/errors/errors.ts';
import { Post, PrismaClient } from '../../generated/prisma/client.js';
import Repository from './Repository.ts';
import IPostRepositories from './interfaces/IPostRepositories.ts';

export class PostRepositories extends Repository<Post> implements IPostRepositories {
    constructor (
        private readonly Post: PrismaClient['post'],
    ){super(Post)}
}
