import {Mensaje, Usuario} from 'db';

type MessageWithAutor = Mensaje & {
  autor: Omit<Usuario, 'contrasenia'>;
};

export type NestedMessage = MessageWithAutor & {
  respuestas: NestedMessage[];
};


export type GetMensajeForUserDTO = Omit<Mensaje, 'updatedAt'> | {autor: Pick<Usuario, 'nombre_apellido' | 'email' | 'id'>, respuestas: Omit<Mensaje, 'updatedAt'>}[];
export type GetMensajeForAdminDTO = {
    updatedAt: Date | null;
} & GetMensajeForUserDTO;

export type GetMensajeForRolDTO = GetMensajeForAdminDTO | GetMensajeForUserDTO

export const mensaje_mapper = {
    USER: (mensaje: Mensaje): GetMensajeForUserDTO => ({
        id: mensaje.id,
        contenido: mensaje.contenido,
        id_autor: mensaje.id_autor,
        id_post: mensaje.id_post,
        createdAt: mensaje.createdAt,
        id_mensaje: mensaje.id_mensaje
    }),
    ADMIN: (mensaje: Mensaje): GetMensajeForAdminDTO => ({
        id: mensaje.id,
        contenido: mensaje.contenido,
        id_autor: mensaje.id_autor,
        id_post: mensaje.id_post,
        createdAt: mensaje.createdAt,
        id_mensaje: mensaje.id_mensaje,
        updatedAt: mensaje.updatedAt
    }),
    MODERADOR: (mensaje: Mensaje): GetMensajeForAdminDTO => ({
        id: mensaje.id,
        contenido: mensaje.contenido,
        id_autor: mensaje.id_autor,
        id_post: mensaje.id_post,
        createdAt: mensaje.createdAt,
        id_mensaje: mensaje.id_mensaje,
        updatedAt: mensaje.updatedAt
    })
} as const;