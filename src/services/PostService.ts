import { Post } from "db";
import { validateService } from "../decorators/errors/errors.js";
import IPostRepository from "../repositories/interfaces/IPostRepository.js";
import IPostService from "./interfaces/IPostService.js";
import Service from "./Service.js";
import { PaginationParams, PaginationResults } from "../types/pagination.types.js";
import { GetPostForRolDTO, post_mapper } from "../types/DTOs/PostDTO.js";
import { toUser } from "../utils/mapper/ForUserRol.js";

export class PostService extends Service<Post> implements IPostService {
    constructor(private readonly postRepository: IPostRepository) {
        super(postRepository, 'post');
    }

    @validateService('not found: ')
    async findByTitle(name: string): Promise<GetPostForRolDTO[]> {
        const posts = await this.postRepository.findByTitle(name) as Post[];
        return await toUser<GetPostForRolDTO, Post, typeof post_mapper>(posts, post_mapper);
    }

    @validateService('not found: ')
    async findById(id: number): Promise<GetPostForRolDTO> {
        const post = await this.postRepository.findById(id) as Post;
        return await toUser<GetPostForRolDTO, Post, typeof post_mapper>(post, post_mapper).then(posts => posts[0]);
    }

    @validateService('not found: ')
    async findAll(): Promise<GetPostForRolDTO[]> {
        const posts = await this.postRepository.findAll() as Post[];
        return await toUser<GetPostForRolDTO, Post, typeof post_mapper>(posts, post_mapper);
    }

    @validateService('Pagination failed: ')
    async getPagination(params: PaginationParams): Promise<PaginationResults<GetPostForRolDTO>> {
        const result = await this.postRepository.getPagination(params);

        if (!result || !Array.isArray(result.data)) {
            throw new Error("Formato de resultado inválido");
        }

        return {
            ...result,
            data: await toUser<GetPostForRolDTO, Post, typeof post_mapper>(result.data, post_mapper)
        };
    }

}
