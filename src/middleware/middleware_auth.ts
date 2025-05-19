import { Request, Response, NextFunction } from "express";
const jwt  = require ("jsonwebtoken");
const cookie = require ("cookie");
const ts = require("ts-pattern")
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;


export const VerificarLogin = (req : Request, res: Response, next: NextFunction) => {
   // si no existe el email o la contraseña, se verifica si existe la cookie
    const {email, contrasena} = req.body;
    const result = ts.match(req.body)
        .with({email: ts.string, contrasena: ts.string}, () => {
            
            // si el email no es valido, se retorna un error
            if (!emailRegex.test(email)){throw new Error("El email no es valido");}

            // Si la contraseña no es valida, se retorna un error
            if (!contrasenaRegex.test(contrasena)){throw new Error("la contraseña no es valida");}

            // si existe el email y la contraseña, se verifica si son correctos
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
            }

        });
        .otherwise(() => {

        });
};


