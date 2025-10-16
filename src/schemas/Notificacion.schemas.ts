import {Type, Static, Conditional} from 'typebox';

export const NotificaionSchema = Type.Object({
    contenido: Type.String(),
    id_usuario: Type.Number(),
    type: Type.Union([
        Type.Literal("tema"),
        Type.Literal("post"),
        Type.Literal("mensaje"),
        ]),
});

const NotificaionBase = {
    id: Type.Number(),
    contenido: Type.String(),
    leido: Type.Boolean(),
    id_usuario: Type.Number(),
    createdAt: Type.Optional(Type.String({format: 'date-time' })),
    updatedAt: Type.Optional(Type.String({format: 'date-time' })),
}

const NotificacionConTema = Type.Object({
    ...NotificaionBase,
    tema_id: Type.Optional(Type.Number()),
});

const NotificacionConPost = Type.Object({
    ...NotificaionBase,
    post_id: Type.Optional(Type.Number()),
});

const NotificacionConMensaje = Type.Object({
    ...NotificaionBase,
    mensaje_id: Type.Optional(Type.Number()),
});

export const GetNotificacionesSchema = Type.Union([
    NotificacionConTema,
    NotificacionConPost,
    NotificacionConMensaje,
]);

export type PostNotificacionDTO = Static<typeof NotificaionSchema>;
export type GetNotificacionDTO = Static<typeof GetNotificacionesSchema>;