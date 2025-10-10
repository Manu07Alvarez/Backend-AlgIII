import { Request, Response, NextFunction } from "express";
import { jwtVerify, importSPKI } from "jose";
import { getPublicKey } from "../utils/auth/KeyGen.js";
import { validateSchema } from "../utils/validate.js";
import { UserLogin } from "schemas/Usuarios.schema.js";
import ValidateError from "Errors/ValidateError.js";
import { auth, enhance } from '@zenstackhq/runtime';
import { AuthUserDTO } from "../types/DTOs/UsuariosDTO.js";
import { prismaApp } from "../utils/factories/ClassFactory.js"; 
import { auth_context } from "../utils/context/AuthUserContext.js";

export let auth_user: AuthUserDTO;

export async function authLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, contrasenia } = req.body;

    if (email && contrasenia) {
        try{ 
            console.log("Email y contraseña encontradas");
            validateSchema<UserLogin>("login", req.body);
            next();
        }catch(error){
            if (error instanceof ValidateError) {
                res.status(400).json({ mensaje: error.message, details: error.details });
            }
            res.status(500).json({ mensaje: "ocurrio un error inesperado" });
        }
    }
    res.status(401).json({ mensaje: "No se proporcionaron credenciales validas" });
};
