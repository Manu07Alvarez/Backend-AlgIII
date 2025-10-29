import { validateRepo } from '../decorators/errors/errors.js';
import Repository from './Repository.js';
import { INotificacionRepository } from './interfaces/INotificacionRepository.js';
import { GetNotificacionDTO } from '../types/DTOs/NotificacionesDTO.js';
import { mapNotificacion } from '../mappers/Notificacion.mapper.js';

export default class NotificacionRepository extends Repository<any, "notificacion">
  implements INotificacionRepository
{
  constructor() {
    super("notificacion");
  }

  @validateRepo
  @validateRepo
async crear(
  data: {
    contenido: string;
    id_usuario: number;
    id_tema?: number;
    id_post?: number;
    id_mensaje?: number;
  }
): Promise<GetNotificacionDTO> {
  const noti = await super["db"].create({
    data,
    include: { usuario: true, tema: true, post: true, Mensaje: true }
    // ❌ sin context
  });

  const dto = mapNotificacion(noti);
  this.emitirNotificacion(dto);
  return dto;
}

  private emitirNotificacion(noti: GetNotificacionDTO) {
    if (globalThis.io) {
      globalThis.io.to(`usuario-${noti.id_usuario}`).emit('nueva-notificacion', noti);
    }

  }

  @validateRepo
  async listarPorUsuarioYRol( 
    id_usuario: number,
    rol: 'ADMIN' | 'MODERADOR' | 'USUARIO',
    temasModerador?: number[]
  ): Promise<GetNotificacionDTO[]> {
    let notificaciones;

    if (rol === 'ADMIN') {
      notificaciones = await super["db"].findMany({
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: 'desc' },
      });
    } else if (rol === 'MODERADOR') {
      notificaciones = await super["db"].findMany({
        where: {
          OR: [{ id_usuario }, { id_tema: { in: temasModerador ?? [] } }],
        },
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      notificaciones = await super["db"].findMany({
        where: { id_usuario },
        include: { usuario: true, tema: true, post: true, Mensaje: true },
        orderBy: { createdAt: 'desc' },
      });
    }

    return notificaciones.map(mapNotificacion);
  }

  @validateRepo
  async marcarLeido(id: number): Promise<GetNotificacionDTO> {
    const noti = await super["db"].update({
      where: { id },
      data: { leido: true },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
    return mapNotificacion(noti);
  }

  @validateRepo
  async eliminar(id: number): Promise<GetNotificacionDTO> {
    const noti = await super["db"].delete({
      where: { id },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
    return mapNotificacion(noti);
  }
}
