import { Mensaje } from "../generated/prisma/client.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validateService } from "../decorators/errors/errors.js";
import IMensajesRepository from "../repositories/interfaces/IMensajesRepository.js";
import IMensajesService from "./interfaces/IMensajesService.js";
import Service from "./Service.js";

export class MensajesService extends Service<Mensaje> implements IMensajesService {
    constructor(
        private readonly mensajeRepository: IMensajesRepository,
    ) {super(mensajeRepository, 'Carrera');}

    @validateService('not found: ')
    public async messagesResponded(messageId: number): Promise<Mensaje[]> {
        return this.entity.messagesResponded(messageId);
    }

    @validateService('not found: ')
    public async findAllInUserId(userId: number): Promise<Mensaje[]> {
        return this.entity.findByUserId(userId);
    }

    @validateService('not found: ')
    public async findAllInPost(postId: number): Promise<Mensaje[]> {
        return this.entity.findAllInPost(postId);
    }
}