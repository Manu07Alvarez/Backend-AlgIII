import {Type, Static} from '@sinclair/typebox';
import { Rol } from 'db';
const passwordPattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/';
export const UsuarioSchema = Type.Object({
  nombre_apellido: Type.String(),
  email: Type.String({ format: 'email' }),
  contrasenia: Type.String({ minLength: 8 }),
  rol: Type.Enum(Rol),
  activo: Type.Boolean({ default: true }),
});

export const UserLoginSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  contrasenia: Type.String({ 
    minLength: 8, 
    maxLength: 20, 
    description: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
    pattern: passwordPattern 
  }),
})
export type Usuario = Static<typeof UsuarioSchema>;
export type UserLogin = Static<typeof UserLoginSchema>;
