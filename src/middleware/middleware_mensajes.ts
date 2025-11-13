import { Request, Response, NextFunction } from "express";
import { MensajeSchema } from "../schemas/Mensajes.schemas.js";
import { mensaje_validator } from "../utils/Validation.js";
import { validateSchema } from "../utils/validate.js";
import ValidateError from "../Errors/ValidateError.js";

export async function validateMensajes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // ✅ Ya no se compila, se usa el validador global precompilado
    await validateSchema(mensaje_validator as any, MensajeSchema as any, req.body);
    next();
  } catch (err) {
    if (err instanceof ValidateError) {
      console.error("❌ Errores de validación:", err.details);
      res.status(400).json({
        mensaje: "Datos de mensaje no válidos",
        errores: err.details,
      });
      return; 
    }

    next(err);
  }
}
