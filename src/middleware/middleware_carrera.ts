import { Response, Request, NextFunction } from 'express';
import { CarreraSchema } from '../schemas/Carreras.schemas.js';
import { validateSchema } from '../utils/validate.js';
import ValidateError from '../Errors/ValidateError.js';
import { carrera_validator } from '../utils/Validation.js';

export async function validateCarrera(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await validateSchema(carrera_validator as any, CarreraSchema as any, req.body);
    next();
  } catch (err) {
    if (err instanceof ValidateError) {
      console.error('Errores de validación:', err.details);
      res.status(400).json({
        mensaje: 'Datos de carrera no válidos',
        errores: err.details,
      });
      return;
    }

    next(err);
  }
}
