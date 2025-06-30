import { Mensaje } from "../../prisma/client.ts";

export default interface IMensajesService {
    create(data: Mensaje): Promise<void>;
    findAllInPost(postId: number): Promise<Mensaje[]>;
    findAllInUserId(userId: number): Promise<Mensaje[]>;
    findById(id: number): Promise<Partial<Mensaje>>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Mensaje): Promise<void>;
}