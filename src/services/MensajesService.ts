import { Mensaje } from "../generated/prisma/client.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validateService } from "../decorators/errors/errors.js";
import IMensajesRepository from "../repositories/interfaces/IMensajesRepository.js";
import IMensajesService from "./interfaces/IMensajesService.js";
import Service from "./Service.js";
import { GetMensajeForRolDTO, mensaje_mapper, NestedMessage } from "../types/DTOs/MensajesDTO.js";
import { toUser } from "../utils/mapper/ForUserRol.js";

export class MensajesService extends Service<Mensaje> implements IMensajesService {
    constructor(
        private readonly mensajeRepository: IMensajesRepository,
    ) {super(mensajeRepository, 'Mensajes');}


    @validateService('not worked: ')
    public async like(id: number): Promise<void> {
        await this.mensajeRepository.like(id);
    }

    @validateService('not found: ')
    public async findAllInUserId(userId: number): Promise<GetMensajeForRolDTO[]> {
        const mensajes = await this.mensajeRepository.findAllInUserId(userId);
        return await toUser<GetMensajeForRolDTO, Mensaje, typeof mensaje_mapper>(mensajes, mensaje_mapper);
    }

    @validateService('not found: ')
    public async findById(id: number): Promise<GetMensajeForRolDTO> {
        const mensaje = this.entity.findById(id);
        return await toUser<GetMensajeForRolDTO, NestedMessage, typeof mensaje_mapper>(mensaje, mensaje_mapper).then(mensajes => mensajes[0]);
    }

    @validateService('not found: ')
    public async findAllInPost(postId: number): Promise<GetMensajeForRolDTO[]> {
        const mensajes = await this.entity.findAllInPost(postId);
        return await toUser<GetMensajeForRolDTO, NestedMessage, typeof mensaje_mapper>(mensajes, mensaje_mapper);
    }
}