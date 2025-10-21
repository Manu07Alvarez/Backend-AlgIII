import { Usuario } from "db";

export type UsuariosDTO = {
    id: number
    email: string
    nombre_apellido: string
    rol: "USUARIO" | "ADMIN" | "MODERADOR"
    activo: boolean
}


export type AuthUserDTO = {
    id: number
    rol: "USUARIO" | "ADMIN" | "MODERADOR"
}

export type GetUserForUserDTO = {
    createdAt: Date | null;
    nombre_apellido: string | null;
    email: string;
    id: number;
} 
export type GetUserForAdminDTO = {
    updatedAt: Date | null;
    rol: "ADMIN" | "MODERADOR" | "USUARIO";
    activo: boolean;
} & GetUserForUserDTO;

export type GetUserForRolDTO = GetUserForAdminDTO | GetUserForUserDTO
export const user_mapper = {
    USER: (user: Usuario): GetUserForUserDTO => ({
        id: user.id,
        nombre_apellido: user.nombre_apellido,
        email: user.email,
        createdAt: user.createdAt
    }),
    ADMIN: (user: Usuario): GetUserForAdminDTO => ({
        id: user.id,
        nombre_apellido: user.nombre_apellido,
        email: user.email,
        rol: user.rol!,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        activo: user.activo
    }),
    MODERADOR: (user: Usuario): GetUserForAdminDTO => ({
        id: user.id,
        nombre_apellido: user.nombre_apellido,
        email: user.email,
        rol: user.rol!,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        activo: user.activo
    })
} as const;