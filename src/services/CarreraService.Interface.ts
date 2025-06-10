import { Carrera } from "../../generated/prisma";

export interface ICarreraService {
  create(data: Carrera): Promise<void>;
  findById(id: number): Promise<Partial<Carrera>>;
  findByName(nombre: string): Promise<Partial<Carrera>>;
  findAll(): Promise<Carrera[]>;
  deactivate(id: number): Promise<void>;
  activate(id: number): Promise<void>;
  update(id: number, data: Carrera): Promise<void>;
}