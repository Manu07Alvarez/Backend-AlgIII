import {Tema} from 'db';

export type GetTemaForUserDTO = {
    createdAt: Date | null;
    nombre: string;
    titulo: string;
    contenido: string;
    id_carrera: number;
    id_creador: number;
    id: number;
} 
export type GetTemaForAdminDTO = {
    updatedAt: Date | null;
    fijado: boolean;
    cerrado: boolean;
} & GetTemaForUserDTO;

export type GetTemaForRolDTO = GetTemaForAdminDTO | GetTemaForUserDTO

export const tema_mapper = {
    USER: (tema: Tema): GetTemaForUserDTO => ({
        id: tema.id,
        nombre: tema.nombre,
        titulo: tema.nombre,
        id_creador: tema.id_creador,
        id_carrera: tema.id_carrera,
        contenido: tema.contenido,
        createdAt: tema.createdAt
    }),
    ADMIN: (tema: Tema): GetTemaForAdminDTO => ({
        id: tema.id,
        nombre: tema.nombre,
        titulo: tema.nombre,
        id_creador: tema.id_creador,
        id_carrera: tema.id_carrera,
        contenido: tema.contenido,
        createdAt: tema.createdAt,
        updatedAt: tema.updatedAt,
        fijado: tema.fijado,
        cerrado: tema.cerrado

    }),
    MODERADOR: (tema: Tema): GetTemaForAdminDTO => ({
        id: tema.id,
        nombre: tema.nombre,
        titulo: tema.nombre,
        id_creador: tema.id_creador,
        id_carrera: tema.id_carrera,
        contenido: tema.contenido,
        createdAt: tema.createdAt,
        updatedAt: tema.updatedAt,
        fijado: tema.fijado,
        cerrado: tema.cerrado
    })
} as const;