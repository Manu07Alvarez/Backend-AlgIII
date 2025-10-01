export type TemasReportesDTO = {
    id : number,
    nombre: string,
    titulo: string,
    id_creador: number,
    contenido: string,
    id_carrera: number,
    fijado: boolean,
    createdAt: Date | null,
    updatedAt: Date | null,
    cerrado: boolean
}

export type PostsReportesDTO = {
    id : number,
    titulo: string,
    contenido: string,
    published: boolean,
    id_autor: number,
    id_tema: number,
}

export type MensajesReportesDTO = {
    id : number,
    contenido: string,
    id_autor: number,
    id_post: number,
    createdAt: Date | null,
    updatedAt: Date | null,
}

export type UsuariosReportesDTO = {
    id : number,
    nombre_apellido: string | null,
    email: string,
    rol: string | null,
    activo: number,
}