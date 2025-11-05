import {Type, Static} from 'typebox';
import { Rol } from 'db';
import {TPasswordType } from '../types/EntitysTypes.js';

export const UsuarioSchema = Type.Object({
  nombre_apellido: Type.String(),
  alias: Type.String(),
  alumno_iseta: Type.Boolean(),
  carrera_iseta: Type.Optional(Type.String()),
  email: Type.String({ format: 'email' }),
  contrasenia: new TPasswordType(),
  rol: Type.Enum(Rol),
  activo: Type.Boolean({ default: true }),
});

export const UserLoginSchema = Type.Object({
  email: Type.String({ required: true, format: 'email' }),
  contrasenia: new TPasswordType(),
})


export type POSTUsuario = {
  nombre_apellido: string;
  alias: string;
  alumno_iseta: boolean;
  carrera_iseta: string | null;
  email: string;
  contrasenia: string;
  rol: Rol;
  activo: boolean;
}
export type UserLogin = Static<typeof UserLoginSchema>;

