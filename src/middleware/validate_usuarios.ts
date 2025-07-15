import { UsuarioSchema } from "schemas/usuarios.schema.ts";
import { validateSchema } from "utils/validate.ts";
import { Prisma } from "../prisma/index.js";
import { Request , Response, NextFunction } from "express";

export async function validateUsuarios(req: Request, res: Response, next: NextFunction) {
  
    const usuario = await Prisma.user.findFirst({ where: { email: req.body.email } });

    const { valid, errors } = validateSchema(UsuarioSchema, req.body);

    if (!valid) {
        console.error("Errores de validación:", errors);
        return res.status(400).json({ mensaje: "Datos de usuario no válidos", errors });
    }
    next();
}
