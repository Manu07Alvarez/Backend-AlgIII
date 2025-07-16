import { Post } from "../generated/prisma/client.js";
import { validateService } from "decorators/errors/errors.js";
import IPostRepository from "../repositories/interfaces/IPostRepository.js";
import IPostService  from "./interfaces/IPostService.js";
import Service from "./Service.js";

export class PostService extends Service<Post> implements IPostService {
    constructor (
        private readonly postRepository: IPostRepository,
    ) {
        super(postRepository, 'post');
    }
}