import ITemaRepository from "../repositories/interfaces/ITemaRepository.ts";
import { Tema, PrismaClient } from "../../generated/prisma/client.js";
import ITemasService from "./interfaces/ITemaService.ts";
import service from "./Service.ts";

export class TemasService extends service<Tema> implements ITemasService {
    constructor(
        private readonly TemasRepositories : ITemaRepository,
    ) {
        super(TemasRepositories, 'Tema');
    }
}

