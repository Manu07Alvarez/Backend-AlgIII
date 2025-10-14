import { Request, Response, NextFunction } from "express";
import { validateSchema } from "../utils/validate.js";
import { UserLoginSchema } from "../schemas/Usuarios.schema.js";
import ValidateError from "../Errors/ValidateError.js";
import { AuthUserDTO } from "../types/DTOs/UsuariosDTO.js";
import { login_validator } from "../utils/Validation.js";

export let auth_user: AuthUserDTO;

export async function authLogin(req: Request, res: Response, next: NextFunction) {
    const data = { 
        email: req.body.email, 
        contrasenia: req.body.contrasenia 
    }; 

    if (data.email && data.contrasenia) {
        try{ 
            console.log("Email y contraseña encontradas");
            validateSchema(login_validator, UserLoginSchema, data);
            return next();
        }catch(error){
            if (error instanceof ValidateError) {
                console.error("Errores de validación:", error.details); 
                return res.status(400).json({ mensaje: error.message, details: error.details });
            }
            return res.status(500).json({ mensaje: "ocurrio un error inesperado" });
        }
    }
    return res.status(401).json({ mensaje: "No se proporcionaron credenciales validas" });
};
