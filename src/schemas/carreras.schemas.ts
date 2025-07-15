import { Type, Static} from '@sinclair/typebox';

export const CarreraSchema = Type.Object({
  id: Type.String(),
  nombre: Type.String(),
  descripcion: Type.Optional(Type.String()),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
  activa: Type.Boolean({ default: true }),
});
export type Carrera = Static<typeof CarreraSchema>;