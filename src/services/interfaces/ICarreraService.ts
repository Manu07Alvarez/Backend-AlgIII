import { Carrera } from "../../generated/prisma/client.js";

export interface ICarreraService {
  create(data: Partial<Carrera>): Promise<void>;
  findById(id: number): Promise<Partial<Carrera>>;
  findByName(nombre: string): Promise<Partial<Carrera>>;
  findAll(): Promise<Partial<Carrera[]>>;
  activateOrDeactivate(id: number): Promise<void>;
  update(id: number, data: Partial<Carrera>): Promise<void>;
}