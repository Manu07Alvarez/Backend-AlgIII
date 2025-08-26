import { Post } from "../../generated/prisma/client.js";
export default interface IPostRepository {
    create(data: Post): Promise<void>;
    findByTitle(title: string): Promise<Partial<Post>>;
    findById(id: number): Promise<Partial<Post>>;
    findAll(): Promise<Post[]>;
    activateOrDeactivate(id: number): Promise<void>;
    update(id: number, data: Post): Promise<void>;
    delete(id: number): Promise<void>;
}
