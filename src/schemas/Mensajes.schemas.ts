import {Type, Static} from 'typebox';

export const MensajeSchema = Type.Object({
    contenido: Type.String(),
    id_autor: Type.Integer(),
    id_mensaje: Type.Optional(Type.Integer()),
    id_post: Type.Integer()
});

export type Mensaje = Static<typeof MensajeSchema>;