import {Type, Static} from '@sinclair/typebox';
import { Rol } from 'db';

export const UsuarioSchema = Type.Object({
  nombre_apellido: Type.String(),
  email: Type.String({ format: 'email' }),
  contrasena: Type.String({ minLength: 8 }),
  rol: Type.Enum(Rol),
  activo: Type.Boolean({ default: true }),
});

export type Usuario = Static<typeof UsuarioSchema>;
