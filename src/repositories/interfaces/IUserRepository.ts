import { Usuario } from "schemas/Usuarios.schema.js";

export default interface Repository<T> {
  create(data: T): Promise<void>;
  findById(id: number): Promise<Partial<T>>;
  findAll(): Promise<T[]>;
  update(id: number, data: T): Promise<void>;
  delete(id: number): Promise<void>;
  findByName(name: string): Promise<Partial<T>>;
  activateOrDeactivate(id: number): Promise<void>;
  getPagination(params: { page: number; limit: number; search?: string | undefined; sortBy?: string | undefined; sortOrder?: 'asc' | 'desc' | undefined; }): Promise<{ data: Usuario[]; total: number; page: number; limit: number; }>;
}