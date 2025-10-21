import { PrismaClient } from 'db';
import { INotificacionRepository } from "./interfaces/INotificacionRepository.js";
import { GetNotificacionDTO } from "../types/DTOs/NotificacionesDTO.js";

export default class NotificacionRepository implements INotificacionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async crear(data: {
    contenido: string;
    id_usuario: number;
    id_tema?: number;
    id_post?: number;
    id_mensaje?: number;
  }): Promise<GetNotificacionDTO> {
    return this.prisma.notificacion.create({
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
      return this.prisma.notificacion.findMany({
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: "desc" },
      });
    }

    if (rol === "MODERADOR") {
      return this.prisma.notificacion.findMany({
        where: {
          OR: [{ id_usuario }, { id_tema: { in: temasModerador ?? [] } }],
        },
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: "desc" },
      });
    }

    // USUARIO
    return this.prisma.notificacion.findMany({
      where: { id_usuario },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async marcarLeido(id: number): Promise<GetNotificacionDTO> {
    return this.prisma.notificacion.update({
      where: { id },
      data: { leido: true },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
  }

  async eliminar(id: number): Promise<GetNotificacionDTO> {
    return this.prisma.notificacion.delete({
      where: { id },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
  }

  // Opcional: método para cerrar la conexión si lo necesitas
  async disconnect() {
    await this.prisma.$disconnect();
  }
}
