import { Usuario } from "../../generated/prisma/client.js";
import { PaginationParams, PaginationResults } from "types/pagination.types.js";

export  interface IUserService {
    findAll(): Promise<Usuario[]>;
    findById(id: number): Promise<Partial<Usuario>>;
    findByName(name: string): Promise<Partial<Usuario>>; // agregado para homogeneidad con Post
    create(data: Usuario): Promise<void>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Usuario): Promise<void>;
    login(email: string, contraseña: string): Promise<string>;
    register(data: Usuario): Promise<void>;
    bajaUsuario(id: number, data: Usuario): Promise<void>;
    getPagination(params: PaginationParams): Promise<PaginationResults<Partial<Usuario>>>;
}
