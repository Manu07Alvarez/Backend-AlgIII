import {Type, Static} from '@sinclair/typebox';

export const ReporteSchema = Type.Object({
    descripcion: Type.String(),
    id_reportador: Type.Number(),
    id_type: Type.Number(),
});

export type ReporteDTO = Static<typeof ReporteSchema>;