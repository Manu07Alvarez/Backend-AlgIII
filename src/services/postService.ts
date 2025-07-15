import { Post } from "../prisma/client.ts";
import { validateService } from "decorators/errors/errors.ts";
import IPostRepository from "../repositories/interfaces/IPostRepository.ts";
import IPostService  from "./interfaces/IPostService.ts";
import Service from "./Service.ts";

export class PostService extends Service<Post> implements IPostService {
    constructor (
        private readonly postRepository: IPostRepository,
    ) {
        super(postRepository, 'post');
    }
}