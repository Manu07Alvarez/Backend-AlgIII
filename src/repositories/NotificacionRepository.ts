import { PrismaClient } from "@prisma/client";
import { INotificacionRepository } from "./interfaces/INotificacionRepository.js";
import { GetNotificacionDTO } from "../types/DTOs/NotificacionesDTO.js";

const prisma = new PrismaClient();

export class NotificacionRepository implements INotificacionRepository {
  async crear(data: {
    contenido: string;
    id_usuario: number;
    id_tema?: number;
    id_post?: number;
    id_mensaje?: number;
  }): Promise<GetNotificacionDTO> {
    return prisma.notificacion.create({
      data,
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
  }

  async listarPorUsuarioYRol(
    id_usuario: number,
    rol: "ADMIN" | "MODERADOR" | "USUARIO",
    temasModerador?: number[]
  ): Promise<GetNotificacionDTO[]> {
    if (rol === "ADMIN") {
      return prisma.notificacion.findMany({
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: "desc" },
      });
    }

    if (rol === "MODERADOR") {
      return prisma.notificacion.findMany({
        where: {
          OR: [{ id_usuario }, { id_tema: { in: temasModerador ?? [] } }],
        },
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: "desc" },
      });
    }

    // USUARIO
    return prisma.notificacion.findMany({
      where: { id_usuario },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async marcarLeido(id: number): Promise<GetNotificacionDTO> {
    return prisma.notificacion.update({
      where: { id },
      data: { leido: true },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
  }

  async eliminar(id: number): Promise<GetNotificacionDTO> {
    return prisma.notificacion.delete({
      where: { id },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
  }
}
