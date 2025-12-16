import { GetPostForRolDTO } from '../../types/DTOs/PostDTO.js';
import {Post} from 'db';
import {PaginationParams, PaginationResults} from '../../types/pagination.types.js';

export default interface IpostService{
    findAll(): Promise<GetPostForRolDTO[]>;
    findById(id: number): Promise<GetPostForRolDTO>;
    findByTitle(name: string): Promise<GetPostForRolDTO[]>;
    create(data: Partial<Post>): Promise<void>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Partial<Post>): Promise<void>;
    getPagination(params: PaginationParams): Promise<PaginationResults<GetPostForRolDTO>>;
    like(id: number): Promise<void>;
}