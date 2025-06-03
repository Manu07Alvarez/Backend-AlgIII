import { Carrera } from "../../generated/prisma";
import { CarreraRepository } from "../repositories/CarreraRepository";
import { ICarreraService } from "./CarreraService.Interface";

export class CarreraService implements ICarreraService {
    constructor(
        private readonly carreraRepository: CarreraRepository,
    ) {}
    
    public async create(data: Carrera): Promise<void> {
        await this.carreraRepository.create(data);
    }

    public async findByName(searchNombre: string): Promise<Partial<Carrera>> {
        return this.carreraRepository.findByName(searchNombre);
    }

    public async findAll(): Promise<Carrera[]> {
        return await this.carreraRepository.findAll();
    }

    public async findById(searchId: number): Promise<Partial<Carrera>> {
        return this.carreraRepository.findById(searchId);
    }
}