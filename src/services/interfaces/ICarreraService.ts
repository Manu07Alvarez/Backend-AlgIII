import { Carrera } from "../../prisma/client.ts";

export interface ICarreraService {
  create(data: Carrera): Promise<void>;
  findById(id: number): Promise<Partial<Carrera>>;
  findByName(nombre: string): Promise<Partial<Carrera>>;
  findAll(): Promise<Carrera[]>;
  activateOrDeactivate(id: number): Promise<void>;
  update(id: number, data: Carrera): Promise<void>;
}