import { Type, Static} from 'typebox';

export const CarreraSchema = Type.Object({
  nombre: Type.String(),
  descripcion: Type.Optional(Type.String()),
  activa: Type.Boolean({ default: true }),
});
export type Carrera = Static<typeof CarreraSchema>;