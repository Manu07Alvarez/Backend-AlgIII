import { Carrera } from '../../../generated/prisma/client.ts';
export default interface ICarreraRepository {
  create(data: Carrera): Promise<void>;
  findById(id: number): Promise<Partial<Carrera>>;
  findAll(): Promise<Carrera[]>;
  update(id: number, data: Carrera): Promise<void>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Partial<Carrera>>;
  activateOrDeactivate(id: number): Promise<void>;
}