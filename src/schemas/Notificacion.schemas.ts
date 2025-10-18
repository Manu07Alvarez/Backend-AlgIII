import { Type , Static} from 'typebox';

/**
 * Schema base para creación de una notificación.
 * Usado en rutas POST (/notificaciones)
 */
export const NotificacionSchema = Type.Object({
  contenido: Type.String(),
  id_usuario: Type.Number(),
  type: Type.Union([
    Type.Literal('tema'),
    Type.Literal('post'),
    Type.Literal('mensaje'),
  ]),
});

/**
 * Estructura base común a todas las notificaciones
 */
const NotificacionBase = {
  id: Type.Number(),
  contenido: Type.String(),
  leido: Type.Boolean(),
  id_usuario: Type.Number(),
  createdAt: Type.Optional(Type.String({ format: 'date-time' })),
  updatedAt: Type.Optional(Type.String({ format: 'date-time' })),
};

/**
 * Notificación con referencia a un tema
 */
export const NotificacionConTema = Type.Object({
  ...NotificacionBase,
  id_tema: Type.Optional(Type.Number()),
});

/**
 * Notificación con referencia a un post
 */
export const NotificacionConPost = Type.Object({
  ...NotificacionBase,
  id_post: Type.Optional(Type.Number()),
});

/**
 * Notificación con referencia a un mensaje
 */
export const NotificacionConMensaje = Type.Object({
  ...NotificacionBase,
  id_mensaje: Type.Optional(Type.Number()),
});

/**
 * Unión de todas las variantes posibles de notificación
 */
export const GetNotificacionesSchema = Type.Union([
  NotificacionConTema,
  NotificacionConPost,
  NotificacionConMensaje,
]);

/**
 * Tipos inferidos para usar en controladores o servicios
 */
export type PostNotificacionDTO = Static < typeof NotificacionSchema>;
export type GetNotificacionDTO = Static <typeof GetNotificacionesSchema>;
