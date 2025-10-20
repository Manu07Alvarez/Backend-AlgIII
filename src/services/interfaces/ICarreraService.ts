import { GetCarreraForRolDTO } from "types/DTOs/CarrerasDTO.js";
import { Carrera } from "../../generated/prisma/client.js";

export interface ICarreraService {
  create(data: Partial<Carrera>): Promise<void>;
  findById(id: number): Promise<GetCarreraForRolDTO>;
  findByName(nombre: string): Promise<GetCarreraForRolDTO>;
  findAll(): Promise<GetCarreraForRolDTO[]>;
  activateOrDeactivate(id: number): Promise<void>;
  update(id: number, data: Partial<Carrera>): Promise<void>;
}