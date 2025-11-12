import { Response, Request, NextFunction } from 'express';
import { UsuarioSchema } from '../schemas/Usuarios.schema.js';
import { validateSchema } from '../utils/validate.js';
import ValidateError from '../Errors/ValidateError.js';
import { user_validator } from '../utils/Validation.js';

export async function validateCarrera(req: Request, res: Response, next: NextFunction) {
    try {
        await validateSchema( user_validator as any, UsuarioSchema as any, req.body);
        next();
    } catch (err) {
        if (err instanceof ValidateError) {
            console.error('❌ Errores de validación:', err.details);
            return res.status(400).json({
                mensaje: 'Datos de usuario no válidos',
                errores: err.details,
            });
        }
        next(err);
    }
}