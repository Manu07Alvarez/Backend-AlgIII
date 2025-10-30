import { GetNotificacionDTO } from 'types/DTOs/NotificacionesDTO.js'

/**
 * Convierte una notificación de Prisma a GetNotificacionDTO
 */
export const mapNotificacion = (noti: any): GetNotificacionDTO => ({
  id: noti.id,
  contenido: noti.contenido,
  tipo: noti.tipo, // ← nuevo campo dinámico
  leido: noti.leido,
  id_usuario: noti.id_usuario,
  id_tema: noti.id_tema ?? undefined,
  id_post: noti.id_post ?? undefined,
  id_mensaje: noti.id_mensaje ?? undefined,
  usuario: noti.usuario,
  tema: noti.tema ?? undefined,
  post: noti.post ?? undefined,
  Mensaje: noti.Mensaje ?? undefined,
  createdAt: noti.createdAt,
  updatedAt: noti.updatedAt,
});

/**
 * Mapper para array de notificaciones
 */
export const toGetNotificacionesDTO = (
  notificaciones: any[]
): GetNotificacionDTO[] => notificaciones.map(mapNotificacion);
