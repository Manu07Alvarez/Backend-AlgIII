import { Carrera } from "../../generated/prisma";
import { validateService } from "../decorators/errors/errors";
import { CarreraRepository } from "../repositories/CarreraRepository";
import { ICarreraService } from "./CarreraService.Interface";

export class CarreraService implements ICarreraService {
    constructor(
        private readonly carreraRepository: CarreraRepository,
    ) {}

    @validateService('ERROR Carrera not deactivated: ')
    public async deactivate(id: number): Promise<void> {
        await this.carreraRepository.deactivateCarrera(id);
    }

    @validateService('ERROR Carrera not activated: ')
    public async activate(id: number): Promise<void> {
        await this.carreraRepository.activateCarrera(id);
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