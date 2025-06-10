import { number, select } from "ts-pattern/dist/patterns";
import { validateRepo } from "../decorators/errors/errors";
import { temasRepositories } from "../repositories/TemasRepositories";
import { describe } from "node:test";
import { PrismaClient } from "@prisma/client";


export class TemaService {
    private temasRepositories: any;

    /**
     * obtiene todos un tema por id
     * @param id - id del tema a buscar
     */
    constructor() {
        this.temasRepositories = new temasRepositories();
    }
    async getTema(id: number | null = null) {
        if(id){
            const prisma = new PrismaClient();
            return await prisma.temas.findUnique({
                where: { id: id },
                select: {
                    id: true,
                    nombre: true,
                    createdAt: true,
                    updateAt: true
                },
            });
        }else {
            throw new Error("no se proporcionó un id");
        }
    }

    /**
     * elimina un tema por id
     * @param id : numbre - id del tema a eliminar
     */
    async BajaTema(id: number){
        const prisma = new PrismaClient();
        if (id){
            return await prisma.temas.deleteMany({
                where: {
                    id:id
                }
            }
            )
        } else {
            throw new Error("no se proporcionó un id");
        }
    }
}

