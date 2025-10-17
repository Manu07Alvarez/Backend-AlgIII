import { Mensaje } from "../../generated/prisma/client.js";

export default interface IMensajesService {
    create(data: Partial<Mensaje>): Promise<void>;
    findAllInPost(postId: number): Promise<Partial<Mensaje[]>>;
    findAllInUserId(userId: number): Promise<Partial<Mensaje[]>>;
    messagesResponded(messageId: number): Promise<Partial<Mensaje[]>>;
    findById(id: number): Promise<Partial<Mensaje>>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Partial<Mensaje>): Promise<void>;
}