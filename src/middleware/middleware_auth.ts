import { Request, Response, NextFunction } from "express";
import { jwtVerify, importSPKI } from "jose";
import { getPublicKey } from "../utils/auth/KeyGen.js";
import { validateSchema } from "../utils/validate.js";
import { UserLogin } from "schemas/Usuarios.schema.js";
import ValidateError from "Errors/ValidateError.js";
import { AuthUserDTO } from "../types/DTOs/UsuariosDTO.js";

export let auth_user: AuthUserDTO;

export async function authLogin(req: Request, res: Response, next: NextFunction) {
    const { email, contrasenia } = req.body;
    const tsCookie = req.cookies["token"];

    if (tsCookie) {
        console.log("Cookie encontrada.");

        try {
            const publicKey = await getPublicKey();
            const {payload}  = await jwtVerify(tsCookie, publicKey!);
            console.log("Token válido: ", payload);
            auth_user = payload as AuthUserDTO;
            return next();
        } catch (err) {
            console.error("Error al verificar token:", err);
            return res.status(401).json({ mensaje: "Token inválido o expirado" });
        }
    }

    if (email && contrasenia) {
        try{ 
            console.log("Email y contraseña encontradas");
            validateSchema<UserLogin>("login", req.body);
            return next();
        }catch(error){
            if (error instanceof ValidateError) {
                return res.status(400).json({ mensaje: error.message, details: error.details });
            }
            return res.status(500).json({ mensaje: "ocurrio un error inesperado" });
        }
    }

    return res.status(401).json({ mensaje: "No se proporcionaron credenciales validas" });
};
