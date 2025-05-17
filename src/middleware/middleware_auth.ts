import { Request, Response, NextFunction } from "express";
const jwt  = require ("jsonwebtoken");
const cookie = require ("cookie");

//REVISION: fijate de usar la libreria ts-pattern para hacer validaciones de los datos que te llegan en el body
// Ya que es mas limpio y podes definir los parametros. (Ya te la descargue a la libreria).
export const veryfylogin = (req : Request, res: Response) => {
    // revisar si la peticion contiene un email y un password
    const [email, contrasena] = req.body;
    if (email || contrasena) {
        if (email) {
           if (contrasena) { //REVISION: no necesitas hacer lo que se llama "nested if", ya que al usar return estas saliendo de la funcion
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
