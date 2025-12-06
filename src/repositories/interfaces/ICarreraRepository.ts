import { Carrera } from 'db';
export default interface ICarreraRepository {
  create(data: Carrera): Promise<void>;
  findByUserId(id: number): Promise<Partial<Carrera>>;
  update(id: number, data: Carrera): Promise<void>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Partial<Carrera[]>>;
  activateOrDeactivate(id: number): Promise<void>;
}