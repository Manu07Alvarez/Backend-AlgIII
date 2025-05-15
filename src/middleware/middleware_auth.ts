import { error } from "console";
import { Request, Response, NextFunction } from "express";
const jwt  = require ("jsonwebtoken");
const cookie = require ("cookie");
const ts = require("ts-pattern")
const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //<- AVISO: con el regex puede no necesitarias match patterns, osea la libreria ts-pattern
const contrasenaregex = /^[a-zA-Z0-9]{8,}$/;

//REVISION: te deje una funcion abajo con un codigo mas limpio que quizas te ayude.
export const VerificarLogin = (req : Request, res: Response, next: NextFunction) => {
   // si no existe el email o la contraseña, se verifica si existe la cookie
    const {email, contrasena} = req.body;
    const result = ts.match(req.body) //AVISO: esto no esta cumpliendo ningun rol por el momento.
        .with({email: ts.string, contrasena: ts.string}, () => {
            
            // si el email no es valido, se retorna un error
            if (!emailregex.test(email)) {
                throw new Error("El email no es valido");
            }

            // Si la contraseña no es valida, se retorna un error
            if (!contrasenaregex.test(contrasena)){
                throw new Error("la contraseña no es valida");
            }

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

        export const EJEMPLO = (req : Request, res: Response, next: NextFunction) => {
            // si no existe el email o la contraseña, se verifica si existe la cookie
             const {email, contrasena} = req.body;
             if (!emailregex.test(email)) {throw new Error("El email no es valido")};
             if (!contrasenaregex.test(contrasena)) {throw new Error("la contraseña no es valida")}; 
   
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
         

};


