import { Request, Response } from 'express';
import { trace } from '@opentelemetry/api';
import { INotificacionService } from 'services/interfaces/INotificacionService.js';
import { PostNotificacionDTO, GetNotificacionDTO } from '../types/DTOs/NotificacionesDTO.js';

const tracer = trace.getTracer('controller');

export class NotificacionController {
  constructor(
    private readonly notificacionService: INotificacionService
  ) {}

  /**
   * Crear una notificación persistente
   */
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const data: PostNotificacionDTO = req.body;
      const notificacion = await this.notificacionService.crear(data);
      res.status(201).json(notificacion);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  } 

  /**
   * Emitir una notificación manualmente (sin guardar en base de datos)
   */
  public async emit(req: Request, res: Response): Promise<void> {
    try {
      const noti: GetNotificacionDTO = req.body;
      this.notificacionService.emitirNotificacion(noti);
      res.status(200).json({ message: 'Notificación emitida correctamente' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Listar notificaciones de un usuario según su rol
   */
  public async findByUser(req: Request, res: Response): Promise<void> {
    try {
      const id_usuario = Number(req.params.id_usuario);
      const rol = (req as any).user?.rol as 'ADMIN' | 'MODERADOR' | 'USUARIO';
      const temasModerador = (req as any).user?.temasAsignados as number[] | undefined;

      const notificaciones = await this.notificacionService.listarPorUsuarioYRol(
        id_usuario,
        rol,
        temasModerador
      );

      res.status(200).json(notificaciones);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Marcar una notificación como leída
   */
  public async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const notificacion = await this.notificacionService.marcarLeido(id);
      res.status(200).json(notificacion);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  /**
   * Eliminar una notificación
   */
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const notificacion = await this.notificacionService.eliminar(id);
      res.status(200).json(notificacion);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
