import { Request, Response, NextFunction } from "express";
import { ReporteSchema } from "../schemas/Reportes.schemas.js";
import { reporte_validator} from "../utils/Validation.js";
import { validateSchema } from "../utils/validate.js";
import ValidateError from "../Errors/ValidateError.js";

export async function validateReporte(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    
    await validateSchema(reporte_validator as any, ReporteSchema as any, req.body);
    next();
  } catch (err) {
    if (err instanceof ValidateError) {
      console.error("❌ Errores de validación:", err.details);
      res.status(400).json({
        mensaje: "Datos de reporte no válidos",
        errores: err.details,
      });
      return; 
    }

    next(err);
  }
}