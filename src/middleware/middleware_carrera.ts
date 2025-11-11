import { Response, Request, NextFunction } from 'express';
import { CarreraSchema } from '../schemas/Carreras.schemas.js';
import { validateSchema } from '../utils/validate.js';
import ValidateError from '../Errors/ValidateError.js';
import { TypeCompiler } from '@sinclair/typebox/compiler';

export async function validateCarrera(req: Request, res: Response, next: NextFunction) {
    try {
        const CarreraCompiled = TypeCompiler.Compile(CarreraSchema as any);
        await validateSchema(CarreraCompiled as any, CarreraSchema as unknown as any, req.body);
        next();
    } catch (err) {
        if (err instanceof ValidateError) {
            console.error('❌ Errores de validación:', err.details);
            return res.status(400).json({
                mensaje: 'Datos de carrera no válidos',
                errores: err.details,
            });
        }
        next(err);
    }
}