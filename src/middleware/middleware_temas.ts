import { Request, Response, NextFunction } from "express";
import { TemaSchema } from "../schemas/Tema.schema.js";
import { tema_validator } from "../utils/Validation.js" 
import { validateSchema } from "../utils/validate.js";
import ValidateError from "../Errors/ValidateError.js";

export async function validateTema(req: Request, res: Response, next: NextFunction) {
  try {
    // ✅ Ya no se compila, se usa el compilado global
    await validateSchema(tema_validator as any, TemaSchema as any, req.body);

    next();
  } catch (err) {
    if (err instanceof ValidateError) {
      console.error("❌ Errores de validación:", err.details);
      return res.status(400).json({
        mensaje: "Datos de temas no válidos",
        errores: err.details,
      });
    }
    next(err);
  }
}
