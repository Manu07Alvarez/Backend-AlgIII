import { Post } from "../../generated/prisma/client.js";
import { validateService } from "decorators/errors/errors.ts";
import { PostRepositories } from "../repositories/postRepositories.js";

export class postService {
    constructor (
        private readonly postRepositories: PostRepositories,){}

    //obtiene los post
    @validateService('ERROR post not found: ')
    public async getPostAll():Promise<Post[]>{
        return await this.postRepositories.getPostAll();
    }

    //obtiene un post por id
    @validateService('ERROR post not found: ')
    public async getPostId(searchId:number):Promise<Partial<Post>>{
        return await this.postRepositories.getPostId(searchId);
    }

    //obtiene un post por su nombre
    @validateService('ERROR post not found: ')
    public async getPostName(searchNombre:string):Promise<Partial<Post>>{
        return await this.postRepositories.getPostName(searchNombre);
    }

    //dar de baja un post
    @validateService('ERROR tema not low ')
    public async bajaPost(id:number): Promise<void>{
        return await this.postRepositories.bajaPost(id);
    }

    //crear post
    @validateService('ERROR tema not created')
    public async crearPost(data:Post):Promise<void>{
        return await this.postRepositories.createPost(data);
    }

    //actualizar Post
    @validateService('ERROR post not updated')
    public async updatePost(data:Post):Promise<void>{
        return await this.postRepositories.updatePost(data);
    }
}