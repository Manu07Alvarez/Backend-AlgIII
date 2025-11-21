import { Request, Response } from 'express';
import { trace } from '@opentelemetry/api';
import { INotificacionService } from '../services/interfaces/INotificacionService.js';
import { PostNotificacionDTO, GetNotificacionDTO } from '../types/DTOs/NotificacionesDTO.js';
import { errorResponse } from '../decorators/errors/errors.js';

const tracer = trace.getTracer('controller');

export class NotificacionController {
  constructor(
    private readonly notificacionService: INotificacionService
  ) {}

  /**
   * Crear una notificación persistente
   */
  @errorResponse
  public async create(req: Request, res: Response): Promise<void> {
    const data: PostNotificacionDTO = req.body;
    const notificacion = await this.notificacionService.crear(data);
    res.status(201).json(notificacion);
  } 

  /**
   * Emitir una notificación manualmente (sin guardar en base de datos)
   */
  @errorResponse
  public async emit(req: Request, res: Response): Promise<void> {
    const id_usuario = parseInt(req.params.id);
    const { contenido, id_tema, id_post, id_mensaje } = req.body;

    const noti: GetNotificacionDTO = {
      id_usuario,
      contenido: contenido ?? 'Tienes una nueva notificación',
      leido: false,
      ...(id_tema && { id_tema }),
      ...(id_post && { id_post }),
      ...(id_mensaje && { id_mensaje }),
    };

    this.notificacionService.emitirNotificacion(noti);

    res.status(200).json({ message: 'Notificación emitida correctamente' });
  }


  /**
   * Listar notificaciones de un usuario según su rol
   */
  @errorResponse
  public async findByUser(req: Request, res: Response): Promise<void> {
    const id_usuario = Number(req.params.id_usuario);
    const rol = (req as any).user?.rol as 'ADMIN' | 'MODERADOR' | 'USUARIO';
    const temasModerador = (req as any).user?.temasAsignados as number[] | undefined;

    const notificaciones = await this.notificacionService.listarPorUsuarioYRol(
      id_usuario,
      rol,
      temasModerador
    );

    res.status(200).json(notificaciones);
  }

  /**
   * Marcar una notificación como leída
   */
  @errorResponse
  public async markAsRead(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const notificacion = await this.notificacionService.marcarLeido(id);
    res.status(200).json(notificacion);
  }

  /**
   * Eliminar una notificación
   */
  @errorResponse
  public async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const notificacion = await this.notificacionService.eliminar(id);
    res.status(200).json(notificacion);
  }
}
