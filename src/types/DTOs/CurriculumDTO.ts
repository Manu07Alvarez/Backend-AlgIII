import {Curriculum} from "db";

export type GetCurriculumForUserDTO = {
    createdAt: Date | null;
    id: number;
    nombre: string; 
    ultimo_titulo: string;
    presentacion: string;
    email_usuario: string;
    id_autor: number;
}

export type GetCurriculumForAdminDTO = {
    updatedAt: Date | null;
    published: boolean;
} & GetCurriculumForUserDTO;

export type GetCurriculumForRolDTO = GetCurriculumForAdminDTO | GetCurriculumForUserDTO

export const curriculum_mapper = {
    USUARIO: (curriculum: Curriculum): GetCurriculumForUserDTO =>  ({
        id: curriculum.id,
        nombre: curriculum.nombre,
        id_autor: curriculum.id_autor,
        createdAt: null,
        ultimo_titulo: "",
        presentacion: "",
        email_usuario: ""
    }),
};                                                      