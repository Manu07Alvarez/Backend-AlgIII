/**import { Request, Response, NextFunction } from "express";
const jwt  = require ("jsonwebtoken");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;


export const authLogin = (req : Request, res: Response, next: NextFunction) => {
            // la dos estructuras de datos son las siguientes:
            const {email, contrasena} = req.body;
            const tsCookie = req.cookies?.TS;

            // verificar si existe el email y la contraseña en el body
            if (email && contrasena) {
                console.log("email y contraseñas encontradas")
                if (!emailRegex.test(email)) {throw new Error("El email no es valido")};
                if (!contrasenaRegex.test(contrasena)) {throw new Error("la contraseña no es valida")};
                return next();   
            }

            // si no existe el email o la contraseña, se verifica si existe la cookie
            if(tsCookie) {
                console.log ("Cookie encontrada.")
                // verificar si existe la token dentro de la Cookie y si existe la firma de la token
                try{
                    const decoded = jwt.verify(tsCookie, process.env.JWT_SECRET as string);
                    console.log("token valido: ", decoded);
                    return next()
                } catch (err) {
                    return res.status(401).json({mensaje: "Token invalido o expirado"});
                }
            }
            // si no existe el email, la contraseña o la cookie, se retorna un error
            return res.status(401).json({mensaje: "No se han proporcionado credenciales"});
        };