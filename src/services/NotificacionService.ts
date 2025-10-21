import { INotificacionService } from "./interfaces/INotificacionService.js";
import { NotificacionRepository } from "../repositories/NotificacionRepository.js";
import {
  toGetNotificacionDTO,
  toGetNotificacionesDTO,
} from "../mappers/Notificacion.mapper.js";
import {
  PostNotificacionDTO,
  GetNotificacionDTO,
} from "../types/DTOs/NotificacionesDTO.js";

export class NotificacionService implements INotificacionService {
  constructor(private readonly notificacionRepository: NotificacionRepository) {}

  async crear(data: PostNotificacionDTO): Promise<GetNotificacionDTO> {
    const prismaData: any = {
      contenido: data.contenido,
      id_usuario: data.id_usuario,
    };

    if (data.type === "tema") prismaData.id_tema = (data as any).id_tema;
    if (data.type === "post") prismaData.id_post = (data as any).id_post;
    if (data.type === "mensaje") prismaData.id_mensaje = (data as any).id_mensaje;

    const notificacion = await this.notificacionRepository.crear(prismaData);
    return toGetNotificacionDTO(notificacion);
  }

  async listarPorUsuario(
    id_usuario: number,
    rol: "ADMIN" | "MODERADOR" | "USUARIO",
    temasModerador?: number[]
  ): Promise<GetNotificacionDTO[]> {
    const notificaciones =
      await this.notificacionRepository.listarPorUsuarioYRol(
        id_usuario,
        rol,
        temasModerador
      );
    return toGetNotificacionesDTO(notificaciones);
  }

  async marcarLeido(id: number): Promise<GetNotificacionDTO> {
    const notificacion = await this.notificacionRepository.marcarLeido(id);
    return toGetNotificacionDTO(notificacion);
  }

  async eliminar(id: number): Promise<GetNotificacionDTO> {
    const notificacion = await this.notificacionRepository.eliminar(id);
    return toGetNotificacionDTO(notificacion);
  }
}
