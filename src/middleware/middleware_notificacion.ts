import { Request, Response, NextFunction } from "express";
import { NotificacionSchema } from "../schemas/Notificacion.schemas.js";
import { Notificacion_validator } from "../utils/Validation.js";
import { validateSchema } from "../utils/validate.js";
import ValidateError from "../Errors/ValidateError.js";

export async function validateNotificacion(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {

    await validateSchema(Notificacion_validator as any, NotificacionSchema as any, req.body);
    next();
  } catch (err) {
    if (err instanceof ValidateError) {
      console.error("Errores de validación:", err.details);
      res.status(400).json({
        mensaje: "Datos de notificación no válidos",
        errores: err.details,
      });
      return; 
    }

    next(err);
  }
}
