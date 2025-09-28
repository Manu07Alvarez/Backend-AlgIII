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


export const PostsReportes = Type.Object({
    id : Type.Number(),
    titulo: Type.String(),
    contenido: Type.String(),
    published: Type.Number(),
    id_autor: Type.Number(),
    id_tema: Type.Number(),
});

export const TemasReportes = Type.Object({
    id : Type.Number(),
    nombre: Type.String(),
    titulo: Type.String(),
    id_creador: Type.Number(),
    contenido: Type.String(),
    id_carrera: Type.Number(),
    createdAt: Type.Date().Optional(),
    updatedAt: Type.Date().Optional(),
    cerrado: Type.Number(),
})

export const MensajesReportes = Type.Object({
    id : Type.Number(),
    contenido: Type.String(),
    id_autor: Type.Number(),
    id_post: Type.Number(),
    createdAt: Type.Date().Optional(),
    updatedAt: Type.Date().Optional(),
})

export const UsuariosReportes = Type.Object({
    id : Type.Number(),
    nombre_apellido: Type.String().Optional(),
    email: Type.String(),
    rol: Type.String().Optional(),
    activo: Type.Number(),
})

const ReporteBase = {
    descripcion: Type.String(),
    id_reportador: Type.Number(),
    createdAt: Type.Date().Optional(),
    updatedAt: Type.Date().Optional(),
    id_resuelto: Type.Number().Optional(),
}

const ReporteConUsuario = Type.Object({
  ...ReporteBase,
  usuario_id: Type.Number().Optional(),
});


const ReporteConMensaje = Type.Object({
  ...ReporteBase,
  mensaje_id: Type.Number().Optional(),
});

const ReporteConPost = Type.Object({
  ...ReporteBase,
  post_id: Type.Number().Optional(),
});

const ReporteConTema = Type.Object({
  ...ReporteBase,
  tema_id: Type.Number().Optional(),
});

export const GetReportesSchema = Type.Union([
  ReporteConUsuario,
  ReporteConMensaje,
  ReporteConPost,
  ReporteConTema,
]);

export type MensajesReportesDTO = Static<typeof MensajesReportes>;
export type TemasReportesDTO = Static<typeof TemasReportes>;
export type PostsReportesDTO = Static<typeof PostsReportes>;
export type UsuariosReportesDTO = Static<typeof UsuariosReportes>;
export type PostReportesDTO = Static<typeof ReporteSchema>;
export type GetReportesDTO = Static<typeof GetReportesSchema>;