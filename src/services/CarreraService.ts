import { Carrera } from "../generated/prisma/client.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validateService } from "../decorators/errors/errors.js";
import { CarreraRepository } from "../repositories/CarreraRepository.js";
import { ICarreraService } from "./interfaces/ICarreraService.js";
import Service from "./Service.js";
import { carrera_mapper, GetCarreraForRolDTO } from "../types/DTOs/CarrerasDTO.js";
import { toUser } from "utils/mapper/ForUserRol.js";

export class CarreraService extends Service<Carrera> implements ICarreraService {
    constructor(
        private readonly carreraRepository: CarreraRepository,
    ) {super(carreraRepository, 'Carrera');}


    @validateService('not found: ')
    public async findById(id: number): Promise<GetCarreraForRolDTO> {
        const carrera = await this.carreraRepository.findById(id) as Carrera[];
        return await toUser<GetCarreraForRolDTO, Carrera, typeof carrera_mapper>(carrera, carrera_mapper).then(carreras => carreras[0]);
    }

    @validateService('not found: ')
    public async findAll(): Promise<GetCarreraForRolDTO[]> {
        const carreras = await this.carreraRepository.findAll() as Carrera[];
        return await toUser<GetCarreraForRolDTO, Carrera, typeof carrera_mapper>(carreras, carrera_mapper);
    }

    @validateService('not found: ')
    public async findByName(name: string): Promise<GetCarreraForRolDTO> {
        const carrera = await this.carreraRepository.findByName(name) as Carrera[];
        return await toUser<GetCarreraForRolDTO, Carrera, typeof carrera_mapper>(carrera, carrera_mapper).then(carreras => carreras[0]);
    }
}