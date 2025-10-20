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

export async function authToken(req: Request, res: Response, next: NextFunction) {
    try {
        const tsCookie = req.cookies.auth_token;
        console.log("Cookie encontrada.");
        const publicKey = await getPublicKey();
        const {payload}  = await jwtVerify(tsCookie, publicKey!);
        console.log("Token válido: ", payload);
        const auth_user = payload as AuthUserDTO;
        const db = enhance(prismaApp, {user: auth_user}, {logPrismaQuery: true});
        auth_context.run({user: auth_user, db: db},  () => {
            next()
        });
    } catch (err) {
        console.error("Error al verificar token:", err);
        const auth_user = undefined;
        const db = enhance(prismaApp, {user: auth_user}, {logPrismaQuery: true});
        auth_context.run({user: auth_user, db: db},  () => {
            next()
        });
    }
};
