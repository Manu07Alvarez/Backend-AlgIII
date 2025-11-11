import { Request, Response, NextFunction } from "express";
import { MensajeSchema } from "../schemas/Mensajes.schemas.js";
import { validateSchema } from "../utils/validate.js";
import ValidateError from "../Errors/ValidateError.js";
import { TypeCompiler } from "@sinclair/typebox/compiler";

export async function validateMensajes(req: Request, res: Response, next: NextFunction) {
  try {
    const MensajeCompiled = TypeCompiler.Compile(MensajeSchema as any);

    await validateSchema(MensajeCompiled as any, MensajeSchema as unknown as any, req.body);

    next();
  } catch (err) {
    if (err instanceof ValidateError) {
      console.error("❌ Errores de validación:", err.details);
      return res.status(400).json({
        mensaje: "Datos de mensaje no válidos",
        errores: err.details,
      });
    }
    next(err);
  }
}
