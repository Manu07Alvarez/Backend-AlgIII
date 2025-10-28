// src/services/NotificacionService.ts

import NotificacionRepository from "../repositories/NotificacionRepository.js";
import { PostNotificacionDTO, GetNotificacionDTO } from "../types/DTOs/NotificacionesDTO.js";

export class NotificacionService {
  private repo: NotificacionRepository;

  constructor() {
    this.repo = new NotificacionRepository();
  }

  async crear(data: PostNotificacionDTO): Promise<GetNotificacionDTO> {
    return this.repo.crear({
      contenido: data.contenido,
      id_usuario: data.id_usuario,
      id_tema: data.type === "tema" ? data.id_tema : undefined,
      id_post: data.type === "post" ? data.id_post : undefined,
      id_mensaje: data.type === "mensaje" ? data.id_mensaje : undefined,
    });
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
