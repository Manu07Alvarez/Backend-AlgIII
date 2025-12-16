import { GetMensajeForRolDTO, NestedMessage } from "../../types/DTOs/MensajesDTO.js";
import { Mensaje } from "db";

export default interface IMensajesService {
    create(data: Partial<Mensaje>): Promise<void>;
    findAllInPost(postId: number): Promise<GetMensajeForRolDTO[]>;
    findAllInUserId(userId: number): Promise<GetMensajeForRolDTO[]>;
    findById(id: number): Promise<GetMensajeForRolDTO>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Partial<Mensaje>): Promise<void>;
    like(id: number): Promise<void>;
}