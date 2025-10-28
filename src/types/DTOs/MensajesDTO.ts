import {Mensaje, Usuario} from 'db';

type MessageWithAutor = Mensaje & {
  autor: Omit<Usuario, 'contrasenia'>;
};

export type NestedMessage = MessageWithAutor & {
  respuestas: NestedMessage[];
};


export type GetMensajeForUserDTO = Omit<Mensaje, 'updatedAt'>  | {autor?: Pick<Usuario, 'nombre_apellido' | 'email' | 'id'>, respuestas?: Omit<Mensaje, 'updatedAt'>[]};
export type GetMensajeForAdminDTO = {
    updatedAt: Date | null;
} & GetMensajeForUserDTO;

export type GetMensajeForRolDTO = GetMensajeForAdminDTO | GetMensajeForUserDTO

function isNestedMessage(mensaje: Mensaje | NestedMessage): mensaje is NestedMessage {
    return (mensaje as NestedMessage).autor !== undefined;
}

export const mensaje_mapper = {
    USUARIO: (mensaje: Mensaje | NestedMessage): GetMensajeForUserDTO => {
        const dto = {
            id: mensaje.id,
            contenido: mensaje.contenido,
            id_autor: mensaje.id_autor,
            id_post: mensaje.id_post,
            id_mensaje: mensaje.id_mensaje,
            createdAt: mensaje.createdAt,
        };
        // Solo agregamos autor si existe
        if (isNestedMessage(mensaje)) {
            if ((mensaje as NestedMessage).autor) {
                Object.assign(dto, {
                    autor: {
                        id: (mensaje as NestedMessage).autor.id,
                        nombre_apellido: (mensaje as NestedMessage).autor.nombre_apellido,
                        email: (mensaje as NestedMessage).autor.email,
                    },
                });
            }
            if ((mensaje as NestedMessage).respuestas) {
                Object.assign(dto, {
                    respuestas: (mensaje as NestedMessage).respuestas.map(m => mensaje_mapper.USUARIO(m)),
                });
            }
        } else {
            return dto;
        }
        return dto;
    },
    ADMIN: (mensaje: Mensaje): GetMensajeForAdminDTO => {
        const dto = {
            id: mensaje.id,
            contenido: mensaje.contenido,
            id_autor: mensaje.id_autor,
            id_post: mensaje.id_post,
            createdAt: mensaje.createdAt,
            id_mensaje: mensaje.id_mensaje,
            updatedAt: mensaje.updatedAt
        };
                if (isNestedMessage(mensaje)) {
            if ((mensaje as NestedMessage).autor) {
                Object.assign(dto, {
                    autor: {
                        id: (mensaje as NestedMessage).autor.id,
                        nombre_apellido: (mensaje as NestedMessage).autor.nombre_apellido,
                        email: (mensaje as NestedMessage).autor.email,
                    },
                });
            }
            if ((mensaje as NestedMessage).respuestas) {
                Object.assign(dto, {
                    respuestas: (mensaje as NestedMessage).respuestas.map(m => mensaje_mapper.ADMIN(m)),
                });
            }
        } else {
            return dto;
        }
        return dto;
    },
    MODERADOR: (mensaje: Mensaje): GetMensajeForAdminDTO => {
        const dto = {
            id: mensaje.id,
            contenido: mensaje.contenido,
            id_autor: mensaje.id_autor,
            id_post: mensaje.id_post,
            createdAt: mensaje.createdAt,
            id_mensaje: mensaje.id_mensaje,
            updatedAt: mensaje.updatedAt
        };
                if (isNestedMessage(mensaje)) {
            if ((mensaje as NestedMessage).autor) {
                Object.assign(dto, {
                    autor: {
                        id: (mensaje as NestedMessage).autor.id,
                        nombre_apellido: (mensaje as NestedMessage).autor.nombre_apellido,
                        email: (mensaje as NestedMessage).autor.email,
                    },
                });
            }
            if ((mensaje as NestedMessage).respuestas) {
                Object.assign(dto, {
                    respuestas: (mensaje as NestedMessage).respuestas.map(m => mensaje_mapper.MODERADOR(m)),
                });
            }
        } else {
            return dto;
        }
        return dto;
    }
} as const;