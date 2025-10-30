import { PostNotificacionDTO, GetNotificacionDTO } from 'types/DTOs/NotificacionesDTO.js';

export interface INotificacionService {
  /**
   * Crear una notificación
   * @param data 
   */
  crear(data: PostNotificacionDTO): Promise<GetNotificacionDTO>;

  /**
   * Emitir una notificación manualmente (sin crear en base de datos)
   * @param noti 
   */
  emitirNotificacion(noti: GetNotificacionDTO): void;

  /**
   * Listar notificaciones de un usuario filtradas por rol
   * @param id_usuario 
   * @param rol 
   * @param temasModerador 
   */
  listarPorUsuarioYRol(
    id_usuario: number,
    rol: 'ADMIN' | 'MODERADOR' | 'USUARIO',
    temasModerador?: number[]
  ): Promise<GetNotificacionDTO[]>;

  /**
   * Marcar una notificación como leída
   * @param id 
   */
  marcarLeido(id: number): Promise<GetNotificacionDTO>;

  /**
   * Eliminar una notificación
   * @param id 
   */
  eliminar(id: number): Promise<GetNotificacionDTO>;
}
