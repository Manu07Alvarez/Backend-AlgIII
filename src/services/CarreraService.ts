import { Carrera } from "../../generated/prisma/client.js";
import { validateService } from "../decorators/errors/errors.ts";
import { CarreraRepository } from "../repositories/CarreraRepository.ts";
import { ICarreraService } from "./IService.ts";

export class CarreraService implements ICarreraService {
    constructor(
        private readonly carreraRepository: CarreraRepository,
    ) {}


    @validateService('ERROR Carrera state not updated: ')
    public async activateOrDeactivate(id: number): Promise<void> {
        await this.carreraRepository.activateOrDeactivate(id);
    }

    @validateService('ERROR Carrera not updated: ')
    public async update(id: number, data: Carrera): Promise<void> {
        await this.carreraRepository.update(id, data);
    }
    
    @validateService('ERROR Carrera not created: ')
    public async create(data: Carrera): Promise<void> {
        await this.carreraRepository.create(data);
    }

    @validateService('ERROR Carrera not found: ')
    public async findByName(searchNombre: string): Promise<Partial<Carrera>> {
        return this.carreraRepository.findByName(searchNombre);
    }

    @validateService('ERROR Carreras not found: ')
    public async findAll(): Promise<Carrera[]> {
        return await this.carreraRepository.findAll();
    }

    @validateService('ERROR Carrera not found: ')
    public async findById(searchId: number): Promise<Partial<Carrera>> {
        return this.carreraRepository.findById(searchId);
    }
}