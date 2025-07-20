import {Type, Static} from '@sinclair/typebox';

export const PostSchema = Type.Object({
    titulo: Type.String(),
    contenido: Type.String(),
    published: Type.Boolean(),
    id_autor: Type.Integer(),
    id_tema: Type.Integer()
});

export type Post = Static<typeof PostSchema>;