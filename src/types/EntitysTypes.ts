import { PrismaClient } from "db";
export const modelProperties = {
    usuario: PrismaClient.prototype.usuario,
    carrera: PrismaClient.prototype.carrera,
    tema: PrismaClient.prototype.tema,
    post: PrismaClient.prototype.post,
    mensaje: PrismaClient.prototype.mensaje,
    reporte: PrismaClient.prototype.reporte
} as const;

export type ModelKeys = keyof typeof modelProperties;