import { GetNotificacionDTO } from '../types/DTOs/NotificacionesDTO.js';

export function emitirNotificacion(noti: GetNotificacionDTO): void {
  if (globalThis.io) {
    globalThis.io.to(`usuario-${noti.id_usuario}`).emit('nueva-notificacion', noti);
  }
}
