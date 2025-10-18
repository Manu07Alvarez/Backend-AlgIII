import { NotificacionRepository } from 'repositories/NotificacionRepository.js'
import { toGetNotificacionDTO, toGetNotificacionesDTO } from '../mappers/Notificacion.mapper.js';
import { PostNotificacionDTO, GetNotificacionDTO } from '../types/DTOs/NotificacionesDTO.js';
import { INotificacionService } from './interfaces/INotificacionService.js';
/**
 * NotificacionService
 * ------------------
 * Implementa la interfaz INotificacionService.
 * Contiene toda la lógica de negocio de notificaciones, usando repository y mapper.
 */
export const NotificacionService: INotificacionService = {
  crear: async (data: PostNotificacionDTO): Promise<GetNotificacionDTO> => {
    const prismaData: {
      contenido: string;
      id_usuario: number;
      id_tema?: number;
      id_post?: number;
      id_mensaje?: number;
    } = {
      contenido: data.contenido,
      id_usuario: data.id_usuario,
    };

    if (data.type === 'tema') prismaData.id_tema = (data as any).id_tema;
    if (data.type === 'post') prismaData.id_post = (data as any).id_post;
    if (data.type === 'mensaje') prismaData.id_mensaje = (data as any).id_mensaje;

    const notificacion = await NotificacionRepository.crear(prismaData);
    return toGetNotificacionDTO(notificacion);
  },

  listarPorUsuario: async (
    id_usuario: number,
    rol: 'ADMIN' | 'MODERADOR' | 'USUARIO',
    temasModerador?: number[]
  ): Promise<GetNotificacionDTO[]> => {
    const notificaciones = await NotificacionRepository.listarPorUsuarioYRol(
      id_usuario,
      rol,
      temasModerador
    );

    return toGetNotificacionesDTO(notificaciones);
  },

  marcarLeido: async (id: number): Promise<GetNotificacionDTO> => {
    const notificacion = await NotificacionRepository.marcarLeido(id);
    return toGetNotificacionDTO(notificacion);
  },

  eliminar: async (id: number): Promise<GetNotificacionDTO> => {
    const notificacion = await NotificacionRepository.eliminar(id);
    // Retornamos DTO del objeto eliminado
    return {
      id: notificacion.id,
      contenido: notificacion.contenido,
      leido: notificacion.leido,
      id_usuario: notificacion.id_usuario,
      id_tema: notificacion.id_tema ?? undefined,
      id_post: notificacion.id_post ?? undefined,
      id_mensaje: notificacion.id_mensaje ?? undefined,
      createdAt: notificacion.createdAt?.toISOString(),
      updatedAt: notificacion.updatedAt?.toISOString(),
      usuario: notificacion.usuario ?? undefined,
      tema: notificacion.tema ?? undefined,
      post: notificacion.post ?? undefined,
      Mensaje: notificacion.Mensaje ?? undefined,
    };
  },
};