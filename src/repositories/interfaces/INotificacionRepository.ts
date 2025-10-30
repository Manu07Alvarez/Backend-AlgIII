import { GetNotificacionDTO } from 'types/DTOs/NotificacionesDTO.js';

export interface INotificacionRepository {
  /**
   * Crear una notificación
   * @param data - objeto con los campos necesarios para crear la notificación
   */
  crear(
    data: {
      contenido: string;
      tipo: string; 
      id_usuario: number;
      id_tema?: number;
      id_post?: number;
      id_mensaje?: number;
    }
  ): Promise<GetNotificacionDTO>;

  /**
   * Listar notificaciones de un usuario filtradas por rol
   * @param id_usuario - id del usuario
   * @param rol - rol del usuario ('ADMIN' | 'MODERADOR' | 'USUARIO')
   * @param temasModerador - opcional, ids de temas asignados (solo para MODERADOR)
   */
  listarPorUsuarioYRol(
    id_usuario: number,
    rol: 'ADMIN' | 'MODERADOR' | 'USUARIO',
    temasModerador?: number[]
  ): Promise<GetNotificacionDTO[]>;

  /**
   * Marcar una notificación como leída
   * @param id - id de la notificación
   */
  marcarLeido(id: number): Promise<GetNotificacionDTO>;

  /**
   * Eliminar una notificación
   * @param id - id de la notificación
   */
  eliminar(id: number): Promise<GetNotificacionDTO>;
}
