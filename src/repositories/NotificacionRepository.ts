// src/repositories/NotificacionRepository.ts
import { PrismaClient } from '@prisma/client';
import { INotificacionRepository } from './interfaces/INotificacionRepository.js';
import { GetNotificacionDTO } from '../types/DTOs/NotificacionesDTO.js';
import { mapNotificacion } from '../mappers/Notificacion.mapper.js';

const prisma = new PrismaClient();

export default class NotificacionRepository implements INotificacionRepository {
  constructor(private readonly db: PrismaClient = prisma) {
    // Constructor listo para inyección de PrismaClient si se requiere
  }

  async crear(data: {
    contenido: string;
    id_usuario: number;
    id_tema?: number;
    id_post?: number;
    id_mensaje?: number;
  }): Promise<GetNotificacionDTO> {
    const noti = await this.db.notificacion.create({
      data,
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
    return mapNotificacion(noti);
  }

  async listarPorUsuarioYRol(
    id_usuario: number,
    rol: 'ADMIN' | 'MODERADOR' | 'USUARIO',
    temasModerador?: number[]
  ): Promise<GetNotificacionDTO[]> {
    let notificaciones;

    if (rol === 'ADMIN') {
      notificaciones = await this.db.notificacion.findMany({
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: 'desc' },
      });
    } else if (rol === 'MODERADOR') {
      notificaciones = await this.db.notificacion.findMany({
        where: {
          OR: [{ id_usuario }, { id_tema: { in: temasModerador ?? [] } }],
        },
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // USUARIO
      notificaciones = await this.db.notificacion.findMany({
        where: { id_usuario },
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    return notificaciones.map(mapNotificacion);
  }

  async marcarLeido(id: number): Promise<GetNotificacionDTO> {
    const noti = await this.db.notificacion.update({
      where: { id },
      data: { leido: true },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
    return mapNotificacion(noti);
  }

  async eliminar(id: number): Promise<GetNotificacionDTO> {
    const noti = await this.db.notificacion.delete({
      where: { id },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
    return mapNotificacion(noti);
  }
}
