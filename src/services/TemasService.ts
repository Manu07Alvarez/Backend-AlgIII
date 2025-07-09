import { temasRepositories } from "../repositories/TemasRepositories.js";
import { Tema, PrismaClient } from "../../generated/prisma/client.js";
import { ItemasService } from "./interfaces/temaService.interface.js";
import service from "./Service.ts";

export class TemasService extends service<Tema> implements ItemasService {
    constructor(
        private readonly TemasRepositories : temasRepositories,
    ) {
        super(TemasRepositories, 'Tema');
    }
}

