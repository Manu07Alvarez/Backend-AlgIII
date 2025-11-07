import { validateRepo } from '../decorators/errors/errors.js';
import Repository from './Repository.js';
import { INotificacionRepository } from './interfaces/INotificacionRepository.js';
import { GetNotificacionDTO, PostsNotificacionDTO } from '../types/DTOs/NotificacionesDTO.js';
import { mapNotificacion } from '../utils/mapper/Notificacion.mapper.js';

export default class NotificacionRepository extends Repository<any, "notificacion">
  implements INotificacionRepository
{
  constructor() {
    super("notificacion");
  }

 // ya anda
  @validateRepo
  async crear(data: PostsNotificacionDTO): Promise<GetNotificacionDTO> {
    const noti = await super["db"].create({
      data,
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });

    const dto = mapNotificacion(noti);
    this.emitirNotificacion(dto);
    return dto;
  }
 //TODO: falta probar esto en el swagger
  private emitirNotificacion(noti: GetNotificacionDTO) {
    if (globalThis.io) {
      globalThis.io.to(`usuario-${noti.id_usuario}`).emit('nueva-notificacion', noti);
    }
  }
// ya anda
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
 //TODO: no anda
  @validateRepo
  async marcarLeido(id: number): Promise<GetNotificacionDTO> {
    const noti = await super["db"].update({
      where: { id },
      data: { leido: true },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
    return mapNotificacion(noti);
  }
//TODO probar esto en swagger
  @validateRepo
  async eliminar(id: number): Promise<GetNotificacionDTO> {
    const noti = await super["db"].delete({
      where: { id },
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
    return mapNotificacion(noti);
  }
}
