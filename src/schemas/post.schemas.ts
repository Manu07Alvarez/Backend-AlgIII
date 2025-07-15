import {Type, Static} from '@sinclair/typebox';

export const PostSchema = Type.Object({
    id: Type.Integer(),
    titulo: Type.String(),
    contenido: Type.String(),
    published: Type.Boolean(),
    id_autor: Type.Integer(),
    created_at: Type.Optional(Type.String({ format: 'date-time' })),
    updated_at: Type.Optional(Type.String({ format: 'date-time' })),
    id_tema: Type.Integer()
});

export type Post = Static<typeof PostSchema>;