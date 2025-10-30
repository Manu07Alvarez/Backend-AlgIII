import NotificacionRepository from "../repositories/NotificacionRepository.js";
import { PostNotificacionDTO, GetNotificacionDTO } from "../types/DTOs/NotificacionesDTO.js";

export class NotificacionService {
  private repo: NotificacionRepository;

  constructor() {
    this.repo = new NotificacionRepository();
  }

  async crear(data: PostNotificacionDTO): Promise<GetNotificacionDTO> {
    const notificacion = await this.repo.crear({
      contenido: data.contenido,
      tipo: data.tipo,  
      id_usuario: data.id_usuario,
      id_tema: data.id_tema,
      id_post: data.id_post,
      id_mensaje: data.id_mensaje,
    });

    this.emitirNotificacion(notificacion);
    return notificacion;
  }

  emitirNotificacion(noti: GetNotificacionDTO): void {
    if (globalThis.io) {
      globalThis.io.to(`usuario-${noti.id_usuario}`).emit('nueva-notificacion', noti);
    }
  }

 async listarPorUsuarioYRol(
  id_usuario: number, 
  rol: "ADMIN" | "MODERADOR" | "USUARIO",
  temasModerador?: number[]
): Promise<GetNotificacionDTO[]> {
  return this.repo.listarPorUsuarioYRol(id_usuario, rol, temasModerador);
}

  async marcarLeido(id: number): Promise<GetNotificacionDTO> {
    return this.repo.marcarLeido(id);
  }

  async eliminar(id: number): Promise<GetNotificacionDTO> {
    return this.repo.eliminar(id);
  }
}
