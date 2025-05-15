import { Request, Response, NextFunction } from "express";
const jwt  = require ("jsonwebtoken");
const cookie = require ("cookie");


export const veryfylogin = (req : Request, res: Response, next: NextFunction) => {
    // revisar si la peticion contiene un email y un password
    const [email, contrasena] = req.body;
    if (email || contrasena) {
        if (email) {
           if (contrasena) {
               return res.status(201).json({mensaje: "El email y la contraseña son validos."});
           } else {
               return res.status(401).json({mensaje: "La contraseña es incorrecta."});
           }
        } else {
            return res.status(401).json({mensaje: "El email es incorrecto."});
        }
    } else {
        
    }
}


