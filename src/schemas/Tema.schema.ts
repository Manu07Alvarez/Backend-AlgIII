import {Type, Static} from '@sinclair/typebox';

export const TemaSchema = Type.Object({
    nombre: Type.String(),
    titulo: Type.String(),
    id_creador: Type.Integer(),
    contenido: Type.String(),
    id_carrera: Type.Integer(),
    fijado: Type.Boolean(),
    cerrado: Type.Boolean()
});
export type Tema = Static<typeof TemaSchema>;