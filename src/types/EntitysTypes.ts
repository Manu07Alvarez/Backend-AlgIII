import { PrismaClient } from "db";
import  {Type }  from "typebox";
export const modelProperties = {
    usuario: PrismaClient.prototype.usuario,
    carrera: PrismaClient.prototype.carrera,
    tema: PrismaClient.prototype.tema,
    post: PrismaClient.prototype.post,
    mensaje: PrismaClient.prototype.mensaje,
    reporte: PrismaClient.prototype.reporte,
    notificacion: PrismaClient.prototype.notificacion
} as const;
import {} from 'typebox/'

export type ModelKeys = keyof typeof modelProperties;

export class TPasswordType extends Type.Base<string> {
    private passwordRules = [
        {
            pattern: /^.{8,}$/,
            message: "La contraseña debe tener al menos 8 caracteres.",
        },
        {
            pattern: /^.{0,20}$/,
            message: "La contraseña no puede superar los 20 caracteres.",
        },
        {
            pattern: /(?=.*[A-Z])/,
            message: "La contraseña debe incluir al menos una letra mayúscula.",
        },
        {
            pattern: /(?=.*[a-z])/,
            message: "La contraseña debe incluir al menos una letra minúscula.",
        },
        {
            pattern: /(?=.*\d)/,
            message: "La contraseña debe incluir al menos un número.",
        },
        {
            pattern: /(?=.*[@$!%*?&])/,
            message: "La contraseña debe incluir al menos un símbolo especial (@$!%*?&).",
        },
    ];
    public override Check(value: unknown): value is string {
        if (typeof value !== 'string') {
            return false;
        }
        for (const rule of this.passwordRules) {
            if (!rule.pattern.test(value)) {
                return false;
            }
        }
        return typeof value === "string";
    }

    TLocalizedValidationError = Type.Object({
        message: Type.String(),
    });

   public override Errors(value: unknown): object[] {
    if (typeof value !== 'string') {
      return [{ message: 'La contraseña debe ser un texto' }]
    }
    for (const rule of this.passwordRules) {
        if (!rule.pattern.test(value)) {
            return [
                {
                    message: rule.message,
                },
            ]
        }
    }
    return []
  }
}

