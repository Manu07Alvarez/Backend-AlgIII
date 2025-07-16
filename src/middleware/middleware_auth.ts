import { Request, Response, NextFunction } from "express";
import { jwtVerify, importSPKI } from "jose";
import { validateEmail, validateContrasena } from "./validate_email_contrasena.js";

export const authLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, contrasena } = req.body;
    const tsCookie = req.cookies["token"];

    if (email && contrasena) {
        console.log("Email y contraseña encontradas");

        if (!validateEmail(email)) {
            return res.status(400).json({ mensaje: "El email no es válido" });
        }

        if (!validateContrasena(contrasena)) {
            return res.status(400).json({ mensaje: "La contraseña no es válida" });
        }

        return next();
    }

    if (tsCookie) {
        console.log("Cookie encontrada.");

        try {
            const publicKeyStr = process.env.PUBLIC_KEY;
            if (!publicKeyStr) {
                throw new Error("Clave pública no definida en variables de entorno");
            }

            const publicKey = await importSPKI(publicKeyStr, "RS256");
            const { payload } = await jwtVerify(tsCookie, publicKey);
            console.log("Token válido: ", payload);

            return next();
        } catch (err) {
            console.error("Error al verificar token:", err);
            return res.status(401).json({ mensaje: "Token inválido o expirado" });
        }
    }

    return res.status(401).json({ mensaje: "No se han proporcionado credenciales" });
};
