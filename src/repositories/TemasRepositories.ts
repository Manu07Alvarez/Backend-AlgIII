import { PrismaClient } from '@prisma/client';
import { validateRepo } from '../decorators/errors/errors';
import { select } from 'ts-pattern/dist/patterns';

const prisma = new PrismaClient();

// TODO: consulta de temas con where de cerrado = false
export class temasRepositories {
    @validateRepo
    async getTema(id: number | null = null){
       return await prisma.temas.findMany({
        select: {
            id: true,
            nombre: true,
            descripcion: true,
            fecha_creacion: true,
            fecha_modificacion: true

        },
       });
    }
    @validateRepo
    async BajaTema(id: number){
        return await prisma.temas.deleteMany({
            where: {id: id} // se pasa el id que se quiere eliminar
        });
    }
}