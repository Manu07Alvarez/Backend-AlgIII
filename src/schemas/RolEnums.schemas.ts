import {Type, Static} from 'typebox';

export const rolEnum = Type.Enum({
    ADMIN: 'admin',
    USUARIO: 'usuario',
    MODERADOR: 'moderador'
})

export type RolEnum = Static<typeof rolEnum>;