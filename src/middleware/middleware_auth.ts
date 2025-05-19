import { Request, Response, NextFunction } from "express";
const jwt  = require ("jsonwebtoken");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;


export const authLogin = (req : Request, res: Response, next: NextFunction) => {
            // si no existe el email o la contraseña, se verifica si existe la cookie
             const {email, contrasena} = req.body;
             const tsCookie = req.cookies?.TS;
            if (email && contrasena) {
                console.log("email y contraseñas encontradas")
                if (!emailRegex.test(email)) {throw new Error("El email no es valido")};
                if (!contrasenaRegex.test(contrasena)) {throw new Error("la contraseña no es valida")};
                // se verifica si son correctos
                if (email === process.env.EMAIL && contrasena === process.env.CONTRASENA) {
                // si son correctos, se genera una token y se guarda en la cookie
                interface JwtPayload {
                    email: string;
                }
                const token: string = jwt.sign(
                    { email } as JwtPayload,
                    process.env.JWT_SECRET as string,
                    { expiresIn: "4h" }
                );
                res.cookie("TS", token, {httpOnly: true, maxAge: 4 * 60 * 60 * 1000});
            }
            return next();   
            }

            if(tsCookie) {
                console.log ("Cookie encontrada.")
                // verificar si existe la token dentro de la Cookie
                try{
                    const decoded = jwt.verify(tsCookie, process.env.JWT_SECRET as string);
                    console.log("token valido: ", decoded);
                    return next()
                } catch (err) {
                    return res.status(401).json({mensaje: "Token invalido o expirado"});
                }
            }
        };


