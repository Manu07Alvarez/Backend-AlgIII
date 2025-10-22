import { Carrera } from 'db';


export type GetCarreraForUserDTO = Omit<Carrera, 'updatedAt' | 'activa'>;
export type GetCarreraForAdminDTO = {
    updatedAt: Date | null;
    activa: boolean | null;
} & GetCarreraForUserDTO;

export type GetCarreraForRolDTO = GetCarreraForAdminDTO | GetCarreraForUserDTO


export const carrera_mapper = {
    USUARIO: (carrera: Carrera): GetCarreraForUserDTO => ({
        id: carrera.id,
        descripcion: carrera.descripcion,
        nombre: carrera.nombre,
        createdAt: carrera.createdAt,
    }),
    ADMIN: (carrera: Carrera): GetCarreraForAdminDTO => ({
        id: carrera.id,
        descripcion: carrera.descripcion,
        nombre: carrera.nombre,
        createdAt: carrera.createdAt,
        updatedAt: carrera.updatedAt, 
        activa: carrera.activa,
    }),
    MODERADOR: (carrera: Carrera): GetCarreraForAdminDTO => ({
        id: carrera.id,
        descripcion: carrera.descripcion,
        nombre: carrera.nombre,
        createdAt: carrera.createdAt,
        updatedAt: carrera.updatedAt,
        activa: carrera.activa, 
    })
} as const;