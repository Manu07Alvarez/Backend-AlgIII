import { Post } from "../../generated/prisma/client.js";
import { validateService } from "decorators/errors/errors.ts";
import { PostRepositories } from "../repositories/postRepositories.js";
import { IpostService } from "./interfaces/postService.Interface.js";
import Service from "./Service.ts";

export class postService extends Service<Post> implements IpostService {
    constructor (
        private readonly postRepositories: PostRepositories,
    ) {
        super(postRepositories, 'post');
    }
}