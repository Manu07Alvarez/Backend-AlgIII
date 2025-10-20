import { Mensaje } from "../generated/prisma/client.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validateService } from "../decorators/errors/errors.js";
import IMensajesRepository from "../repositories/interfaces/IMensajesRepository.js";
import IMensajesService from "./interfaces/IMensajesService.js";
import Service from "./Service.js";
import { GetMensajeForRolDTO, NestedMessage } from "../types/DTOs/MensajesDTO.js";

export class MensajesService extends Service<Mensaje> implements IMensajesService {
    constructor(
        private readonly mensajeRepository: IMensajesRepository,
    ) {super(mensajeRepository, 'Mensajes');}

    @validateService('not found: ')
    public async messagesResponded(messageId: number): Promise<GetMensajeForRolDTO[]> {
        return this.entity.messagesResponded(messageId);
    }

    @validateService('not found: ')
    public async findAllInUserId(userId: number): Promise<GetMensajeForRolDTO[]> {
        return await this.mensajeRepository.findAllInUserId(userId);
    }

    @validateService('not found: ')
    public async findById(id: number): Promise<GetMensajeForRolDTO> {
        return this.entity.findById(id);
    }

    @validateService('not found: ')
    public async findAllInPost(postId: number): Promise<NestedMessage[]> {
        return this.entity.findAllInPost(postId);
    }
}