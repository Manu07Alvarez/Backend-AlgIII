import ITemaRepository from "../repositories/interfaces/ITemaRepository.js";
import { Tema, PrismaClient } from "../generated/prisma/client.js";
import ITemasService from "./interfaces/ITemaService.js";
import service from "./Service.js";

export class TemasService extends service<Tema> implements ITemasService {
    constructor(
        private readonly TemasRepositories : ITemaRepository,
    ) {
        super(TemasRepositories, 'Tema');
    }
}

