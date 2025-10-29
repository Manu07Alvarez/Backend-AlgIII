import { PostNotificacionDTO, GetNotificacionDTO } from 'types/DTOs/NotificacionesDTO.js';

export interface INotificacionService {
  crear(data: PostNotificacionDTO): Promise<GetNotificacionDTO>;

  emitirNotificacion(noti: GetNotificacionDTO): void;

  listarPorUsuarioYRol(
    id_usuario: number,
    rol: 'ADMIN' | 'MODERADOR' | 'USUARIO',
    temasModerador?: number[]
  ): Promise<GetNotificacionDTO[]>;

  marcarLeido(id: number): Promise<GetNotificacionDTO>;

  eliminar(id: number): Promise<GetNotificacionDTO>;
}
