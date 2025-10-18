import { PrismaClient } from '@prisma/client';
import { GetNotificacionDTO } from '../types/DTOs/NotificacionesDTO.js';

const prisma = new PrismaClient();

/**
 * Tipo inferido de Prisma para una notificación con includes
 */
type NotificacionConIncludes = Awaited<
  ReturnType<typeof prisma.notificacion.findFirst>
>;

/**
 * Mapper que transforma un objeto Prisma 'notificacion'
 * en un GetNotificacionDTO listo para enviar al frontend.
 */
export const toGetNotificacionDTO = (
  notificacion: NotificacionConIncludes
): GetNotificacionDTO => ({
  id: notificacion!.id,
  contenido: notificacion!.contenido,
  leido: notificacion!.leido,
  id_usuario: notificacion!.id_usuario,
  id_tema: notificacion!.id_tema ?? undefined,
  id_post: notificacion!.id_post ?? undefined,
  id_mensaje: notificacion!.id_mensaje ?? undefined,
  createdAt: notificacion!.createdAt?.toISOString(),
  updatedAt: notificacion!.updatedAt?.toISOString(),
  usuario: notificacion!.usuario ?? undefined,
  tema: notificacion!.tema ?? undefined,
  post: notificacion!.post ?? undefined,
  Mensaje: notificacion!.Mensaje ?? undefined,
});

/**
 * Mapper para un array de notificaciones
 */
export const toGetNotificacionesDTO = (
  notificaciones: NotificacionConIncludes[]
): GetNotificacionDTO[] => notificaciones.map(toGetNotificacionDTO);
