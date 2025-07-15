import { Post } from "../../prisma/client.ts";
export default interface IPostRepository {
    create(data: Post): Promise<void>;
    findById(id: number): Promise<Partial<Post>>;
    findAll(): Promise<Post[]>;
    activateOrDeactivate(id: number): Promise<void>;
    update(id: number, data: Post): Promise<void>;
    delete(id: number): Promise<void>;
}
