import { Request, Response, NextFunction } from "express";
import { validateSchema } from "../utils/validate.js";
import { UserLogin } from "schemas/Usuarios.schema.js";
import ValidateError from "../Errors/ValidateError.js";
import { AuthUserDTO } from "../types/DTOs/UsuariosDTO.js";

export let auth_user: AuthUserDTO;

export async function authLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, contrasenia } = req.body;

    if (email && contrasenia) {
        try{ 
            console.log("Email y contraseña encontradas");
            validateSchema<UserLogin>("login", req.body);
            console.log("Test");
            next();
        }catch(error){
            if (error instanceof ValidateError) {
                console.error("Errores de validación:", error.details);
                res.status(400).json({ mensaje: error.message, details: error.details });
            }
            res.status(500).json({ mensaje: "ocurrio un error inesperado" });
        }
    }
    res.status(401).json({ mensaje: "No se proporcionaron credenciales validas" });
};
