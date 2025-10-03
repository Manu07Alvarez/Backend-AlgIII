import { Post } from "db";
export default interface IPostRepository {
    create(data: Post): Promise<void>;
    findByTitle(title: string): Promise<Partial<Post[]>>;
    findById(id: number): Promise<Partial<Post>>;
    findAll(): Promise<Post[]>;
    activateOrDeactivate(id: number): Promise<void>;
    update(id: number, data: Post): Promise<void>;
    delete(id: number): Promise<void>;
    getPagination(params: { page: number; limit: number; search?: string | undefined; sortBy?: string | undefined; sortOrder?: 'asc' | 'desc' | undefined; }): Promise<{ data: Post[]; total: number; page: number; limit: number; }>;
}
