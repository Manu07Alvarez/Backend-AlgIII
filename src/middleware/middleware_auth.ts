import { Request, Response, NextFunction } from "express";
const jwt  = require ("jsonwebtoken");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;


export const authLogin = (req : Request, res: Response, next: NextFunction) => {
            // la dos estructuras de datos son las siguientes:
            const { contrasena } = req.body.contrasena;
            const { email } = req.body.email;
            const tsCookie = req.cookies["token"];

            // verificar si existe el email y la contraseña en el body
            if (email && contrasena) {
                console.log("email y contraseñas encontradas")
                if (!emailRegex.test(email)) {throw new Error("El email no es valido")};
                if (!contrasenaRegex.test(contrasena)) {throw new Error("la contraseña no es valida")};
                return next();   
            }  //REVISION: Verificar casos en el que se encuentre el email o la contraseña pero no ambos
        
            if(tsCookie) {  // si no existe el email o la contraseña, se verifica si existe la cookie
                console.log ("Cookie encontrada.")
                // verificar si existe la token dentro de la Cookie y si existe la firma de la token
                try{
                    const decoded = jwtVerify(tsCookie, publicKey!);
                    console.log("token valido: ", decoded);
                    return next()
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        return res.status(401).json({mensaje: "Token invalido o expirado"});
                    }
                    throw err;
                }
            }
            // si no existe el email, la contraseña o la cookie, se retorna un error
            return res.status(401).json({mensaje: "No se han proporcionado credenciales"});
        };
