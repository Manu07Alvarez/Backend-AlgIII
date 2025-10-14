import {Type, Static} from 'typebox';
import { Rol } from 'db';
import {TPasswordType } from '../types/EntitysTypes.js';

export const UsuarioSchema = Type.Object({
  nombre_apellido: Type.String(),
  email: Type.String({ format: 'email' }),
  contrasenia: new TPasswordType(),
  rol: Type.Enum(Rol),
  activo: Type.Boolean({ default: true }),
});

export const UserLoginSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  contrasenia: new TPasswordType(),
})
export type Usuario = Static<typeof UsuarioSchema>;
export type UserLogin = Static<typeof UserLoginSchema>;

