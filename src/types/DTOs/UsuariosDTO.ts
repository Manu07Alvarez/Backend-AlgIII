import { Usuario } from "db";

export type UsuariosDTO = {
    id: number
    email: string
    alias: string
    alumno_iseta: boolean
    carrera_iseta: string | null
    nombre_apellido: string
    rol: "USUARIO" | "ADMIN" | "MODERADOR"
    activo: boolean
}


export type AuthUserDTO = {
    id: number
    nombre_apellido: string
    alias: string
    alumno_iseta: boolean
    carrera_iseta: string | null
    email: string
    rol: "USUARIO" | "ADMIN" | "MODERADOR"
}

export type GetUserForUserDTO = {
    createdAt: Date | null;
    nombre_apellido: string | null;
    email: string;
    alias: string
    alumno_iseta: boolean
    carrera_iseta: string | null
    id: number;
    rol: "ADMIN" | "MODERADOR" | "USUARIO";
} 
export type GetUserForAdminDTO = {
    updatedAt: Date | null;
    activo: boolean;
} & GetUserForUserDTO;

export type GetUserForRolDTO = GetUserForAdminDTO | GetUserForUserDTO
export const user_mapper = {
    USUARIO: (user: Usuario): GetUserForUserDTO => ({
        id: user.id,
        alias: user.alias,
        carrera_iseta: user.carrera_iseta,
        alumno_iseta: user.alumno_iseta,
        nombre_apellido: user.alias,
        email: user.email,
        createdAt: user.createdAt,
        rol: user.rol!,
    }),
    ADMIN: (user: Usuario): GetUserForAdminDTO => ({
        id: user.id,
        nombre_apellido: user.nombre_apellido,
        alias: user.alias,
        carrera_iseta: user.carrera_iseta,
        alumno_iseta: user.alumno_iseta,
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
        alias: user.alias,
        carrera_iseta: user.carrera_iseta,
        alumno_iseta: user.alumno_iseta,
        rol: user.rol!,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        activo: user.activo
    })
} as const;