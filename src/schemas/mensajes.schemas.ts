import {Type, Static} from '@sinclair/typebox';

export const MensajeSchema = Type.Object({
    id: Type.Integer(),
    contenido: Type.String(),
    id_autor: Type.Integer(),
    id_mensaje: Type.Optional(Type.Integer()),
    created_at: Type.Optional(Type.String({ format: 'date-time' })),
    updated_at: Type.Optional(Type.String({ format: 'date-time' })),
    id_post: Type.Integer()
});

export type Mensaje = Static<typeof MensajeSchema>;