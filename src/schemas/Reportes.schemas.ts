import { format } from 'path';
import {Type, Static} from 'typebox';

export const ReporteSchema = Type.Object({
    descripcion: Type.String(),
    id_reportador: Type.Number(),
    id_type: Type.Number(),
    type: Type.Union([
        Type.Literal("tema"),
        Type.Literal("post"),
        Type.Literal("mensaje"),
        Type.Literal("usuario"),
    ]),
});



const ReporteBase = {
    descripcion: Type.String(),
    id_reportador: Type.Number(),
    createdAt: Type.Optional(Type.String({format: 'date-time' })),
    updatedAt: Type.Optional(Type.String({format: 'date-time' })),
    id_resuelto: Type.Optional(Type.Number()),
}

const ReporteConUsuario = Type.Object({
  ...ReporteBase,
  usuario_id: Type.Optional(Type.Number()),
});


const ReporteConMensaje = Type.Object({
  ...ReporteBase,
  mensaje_id: Type.Optional(Type.Number()),
});

const ReporteConPost = Type.Object({
  ...ReporteBase,
  post_id: Type.Optional(Type.Number()),
});

const ReporteConTema = Type.Object({
  ...ReporteBase,
  tema_id: Type.Optional(Type.Number()),
});

export const GetReportesSchema = Type.Union([
  ReporteConUsuario,
  ReporteConMensaje,
  ReporteConPost,
  ReporteConTema,
]);

export type PostReportesDTO = Static<typeof ReporteSchema>;
export type GetReportesDTO = Static<typeof GetReportesSchema>;