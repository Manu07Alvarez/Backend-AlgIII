import { Carrera } from "../generated/prisma/client.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validateService } from "../decorators/errors/errors.js";
import { CarreraRepository } from "../repositories/CarreraRepository.js";
import { ICarreraService } from "./interfaces/ICarreraService.js";
import Service from "./Service.js";

export class CarreraService extends Service<Carrera> implements ICarreraService {
    constructor(
        private readonly carreraRepository: CarreraRepository,
    ) {super(carreraRepository, 'Carrera');}


}