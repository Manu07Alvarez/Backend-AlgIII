import { Usuario } from "schemas/Usuarios.schema.js";
import { PaginationResults } from "../../types/pagination.types.js";

export default interface IUserRepository {
    create(data: Usuario): Promise<void>;
    findByName(name: string): Promise<Partial<Usuario>>;
    findById(id: number): Promise<Partial<Usuario>>;
    findAll(): Promise<Partial<Usuario[]>>;
    activateOrDeactivate(id: number): Promise<void>;
    update(id: number, data: Usuario): Promise<void>;
    delete(id: number): Promise<void>;
    getPagination(params: {
        page: number;
        limit: number;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }): Promise<PaginationResults<Usuario>>;
}
