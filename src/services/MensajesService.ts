import { Mensaje } from "../../generated/prisma/client.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validateService } from "../decorators/errors/errors.ts";
import IMensajesRepository from "../repositories/interfaces/IMensajesRepository.ts";
import IMensajesService from "./interfaces/IMensajesService.ts";
import Service from "./Service.ts";

export class MensajesService extends Service<Mensaje> implements IMensajesService {
    constructor(
        private readonly mensajeRepository: IMensajesRepository,
    ) {super(mensajeRepository, 'Carrera');}

    @validateService('not found: ')
    public async findAllInUserId(userId: number): Promise<Mensaje[]> {
        return this.entity.findByUserId(userId);
    }

    @validateService('not found: ')
    public async findAllInPost(postId: number): Promise<Mensaje[]> {
        return this.entity.findAllInPost(postId);
    }
}