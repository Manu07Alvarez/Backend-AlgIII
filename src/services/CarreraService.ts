import { Carrera } from "../../generated/prisma/client.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validateService } from "../decorators/errors/errors.ts";
import { CarreraRepository } from "../repositories/CarreraRepository.ts";
import { ICarreraService } from "./interfaces/ICarreraService.ts";
import Service from "./Service.ts";

export class CarreraService extends Service<Carrera> implements ICarreraService {
    constructor(
        private readonly carreraRepository: CarreraRepository,
    ) {super(carreraRepository, 'Carrera');}


}