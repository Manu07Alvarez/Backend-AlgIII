import { validateRepo } from 'decorators/errors/errors.ts';
import { Post, PrismaClient } from '../../generated/prisma/client.js';

export class PostRepositories {
    constructor (
        private readonly Post: PrismaClient['post'],
    ){}

    @validateRepo
    public async getPostAll(): Promise<Post[]> {
        console.log("get post")
        return await this.Post.findMany()
    }

    @validateRepo
    public async getPostName(searchTitulo: string): Promise<Partial<Post>> {
        return this.Post.findFirstOrThrow({
            omit: {
                createdAt : true,
                updatedAt:true
            },
            where: {titulo: searchTitulo}
        });
    }

    @validateRepo
    public async getPostId(searchId: number): Promise<Partial<Post>> {
        return this.Post.findFirstOrThrow({
            omit: {
                createdAt: true,
                updatedAt: true
            },
            where:{ id: searchId }
        });
    }

    @validateRepo
    public async createPost(data: Post): Promise<void>{
        await this.Post.create({data});
    }

    @validateRepo
    public  async updatePost(data:Post): Promise<void> {
        await this.Post.update({
            where: {id:data.id},
            data
        });
    }

    @validateRepo
    public async bajaPost(id:number):Promise<void>{
        await this.Post.delete({
            where: {id:id}
        })
    }
}
