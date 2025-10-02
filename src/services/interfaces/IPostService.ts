import {Post} from '../../generated/prisma/client.js';
import {PaginationParams, PaginationResults} from 'types/pagination.types.js';

export default interface IpostService{
    findAll(): Promise<Post[]>;
    findById(id: number): Promise<Partial<Post>>;
    findByTitle(name: string): Promise<Partial<Post[]>>;
    create(data: Partial<Post>): Promise<void>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Partial<Post>): Promise<void>;
    getPagination(params: PaginationParams): Promise<PaginationResults<Post>>;
}