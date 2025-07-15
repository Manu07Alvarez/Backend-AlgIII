import {Type, Static} from '@sinclair/typebox';

export const TemaSchema = Type.Object({
    id: Type.Integer(),
    nombre: Type.String(),
    createdAt: Type.Optional(Type.String({ format: 'date-time' })),
    updatedAt: Type.Optional(Type.String({ format: 'date-time' })),


    titulo: Type.String(),
    id_creador: Type.Integer(),
    contenido: Type.String(),
    id_carrera: Type.Integer(),
    fijado: Type.Boolean(),
    cerrado: Type.Boolean()
});
export type Tema = Static<typeof TemaSchema>;