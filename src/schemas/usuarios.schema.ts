import {Type, Static} from '@sinclair/typebox';
import { Rol } from '../generated/prisma/index.js';

export const UsuarioSchema = Type.Object({
  id: Type.String(),
  nombre_apellido: Type.String(),
  email: Type.String({ format: 'email' }),
  contrasena: Type.String({ minLength: 8 }),
  rol: Type.Enum(Rol),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
  activo: Type.Boolean({ default: true }),
});

export type Usuario = Static<typeof UsuarioSchema>;