import {Post} from '../../generated/prisma/client.js';

export default interface IpostService{
    findAll(): Promise<Post[]>;
    findById(id: number): Promise<Partial<Post>>;
    findByName(name: string): Promise<Partial<Post>>;
    create(data: Post): Promise<void>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Post): Promise<void>;
}