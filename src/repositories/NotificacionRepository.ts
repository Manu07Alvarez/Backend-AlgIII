import { PrismaClient } from '@prisma/client';
import { INotificacionRepository } from './interfaces/INotificacionRepository.js';

const prisma = new PrismaClient();

/**
 * NotificacionRepository
 * ---------------------
 * Implementa la interfaz INotificacionRepository.
 * Encapsula todas las operaciones directas a la base de datos relacionadas
 * con notificaciones, incluyendo filtrado por rol.
 */
export const NotificacionRepository: INotificacionRepository = {
  crear: (data) => {
    return prisma.notificacion.create({
      data,
      include: {
        usuario: true,
        tema: true,
        post: true,
        Mensaje: true,
      },
    });
  },

  listarPorUsuarioYRol: async (id_usuario, rol, temasModerador) => {
    if (rol === 'ADMIN') {
      return prisma.notificacion.findMany({
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    if (rol === 'MODERADOR') {
      return prisma.notificacion.findMany({
        where: {
          OR: [
            { id_usuario }, // propias
            { id_tema: { in: temasModerador ?? [] } }, // temas asignados
          ],
        },
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    // USUARIO
    return prisma.notificacion.findMany({
      where: { id_usuario },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  marcarLeido: (id) => {
    return prisma.notificacion.update({
      where: { id },
      data: { leido: true },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
  },

  eliminar: (id) => {
    return prisma.notificacion.delete({
      where: { id },
    });
  },
};
