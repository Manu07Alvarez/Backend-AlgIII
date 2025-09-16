import {Type, Static} from '@sinclair/typebox';

export const ReporteSchema = Type.Object({
    descripcion: Type.String(),
    id_reportador: Type.Number(),
    id_type: Type.Number(),
    type: Type.Union([
        Type.Literal("tema"),
        Type.Literal("post"),
        Type.Literal("mensaje"),
    ]),
});


export const PostReportes = Type.Object({
    id : Type.Number(),
    titulo: Type.String(),
    contenido: Type.String(),
    id_autor: Type.Number(),
    id_tema: Type.Number(),
});

export const TemaReportes = Type.Object({
    id : Type.Number(),
    nombre: Type.String(),
    titulo: Type.String(),
    id_creador: Type.Number(),
    contenido: Type.String(),
    id_carrera: Type.Number(),
    fijado: Type.Boolean(),
    cerrado: Type.Boolean(),
})

export const MessageReportes = Type.Object({
    id : Type.Number(),
    contenido: Type.String(),
    id_autor: Type.Number(),
    id_mensaje: Type.Number(),
    id_post: Type.Number(),
})

export type MessageReporteDTO = Static<typeof MessageReportes>;
export type TemaReporteDTO = Static<typeof TemaReportes>;
export type PostReporteDTO = Static<typeof PostReportes>;
export type ReporteDTO = Static<typeof ReporteSchema>;