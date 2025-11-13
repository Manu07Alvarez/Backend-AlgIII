import { Request, Response, NextFunction } from "express";
import { CurriculumSchema } from "../schemas/Curriculum.schemas.js";
import { curriculum_validator } from "../utils/Validation.js";
import { validateSchema } from "../utils/validate.js";
import ValidateError from "../Errors/ValidateError.js";

export async function validateCurriculum(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    
    await validateSchema(curriculum_validator as any, CurriculumSchema as any, req.body);
    next();
  } catch (err) {
    if (err instanceof ValidateError) {
      console.error("❌ Errores de validación:", err.details);
      res.status(400).json({
        mensaje: "Datos del curriculum no válidos",
        errores: err.details,
      });
      return; 
    }

    next(err);
  }
}