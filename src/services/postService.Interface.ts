import {Post} from '../../generated/prisma/client.js';

export interface IpostService{
    crearPost(data: Post): Promise<void>;
    getPostId(id: number): Promise<Partial<Post>>;
    getPostName(nombre: string): Promise<Partial<Post>>;
    getPostAll(): Promise<Post[]>;
    bajaPost(id: number): Promise<void>;
    update(id: number, data: Post): Promise<void>;
}