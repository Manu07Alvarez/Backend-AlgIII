import {Post} from '../../prisma/client.ts';

export interface IpostService{
    findAll(): Promise<Post[]>;
    findById(id: number): Promise<Post | null>;
    findByName(name: string): Promise<Post | null>;
    create(data: Post): Promise<void>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Post): Promise<void>;
}