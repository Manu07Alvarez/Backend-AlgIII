import { GetUserForRolDTO } from "../../types/DTOs/UsuariosDTO.js";
import { Usuario } from "db";
import { PaginationParams, PaginationResults } from "../../types/pagination.types.js";

export  interface IUserService {
    findAllUsers(): Promise<GetUserForRolDTO[]>;
    findById(id: number): Promise<GetUserForRolDTO>;
    findByName(name: string): Promise<GetUserForRolDTO[]>; // agregado para homogeneidad con Post
    create(data: Usuario): Promise<void>;
    activateOrDeactivate(id: number): Promise<void>;
    delete(id: number): Promise<void>;
    update(id: number, data: Usuario): Promise<void>;
    login(email: string, contraseña: string): Promise<string>;
    register(data: Usuario): Promise<void>;
    bajaUsuario(id: number, data: Usuario): Promise<void>;
    getPagination(params: PaginationParams): Promise<PaginationResults<GetUserForRolDTO>>;
}
