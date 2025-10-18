import { PostNotificacionDTO, GetNotificacionDTO } from 'types/DTOs/NotificacionesDTO.js';

export interface INotificacionService {
  /**
   * Crear una notificación
   * @param data - PostNotificacionDTO
   * @returns GetNotificacionDTO
   */
  crear(data: PostNotificacionDTO): Promise<GetNotificacionDTO>;

  /**
   * Listar notificaciones de un usuario filtradas por rol
   * @param id_usuario - id del usuario
   * @param rol - 'ADMIN' | 'MODERADOR' | 'USUARIO'
   * @param temasModerador - opcional, ids de temas asignados (solo para MODERADOR)
   * @returns arreglo de GetNotificacionDTO
   */
  listarPorUsuario(
    id_usuario: number,
    rol: 'ADMIN' | 'MODERADOR' | 'USUARIO',
    temasModerador?: number[]
  ): Promise<GetNotificacionDTO[]>;

  /**
   * Marcar una notificación como leída
   * @param id - id de la notificación
   * @returns GetNotificacionDTO
   */
  marcarLeido(id: number): Promise<GetNotificacionDTO>;

  /**
   * Eliminar una notificación
   * @param id - id de la notificación
   * @returns GetNotificacionDTO
   */
  eliminar(id: number): Promise<GetNotificacionDTO>;
}
