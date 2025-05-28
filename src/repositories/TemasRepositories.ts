import { PrismaClient } from '@prisma/client';
import { validateRepo } from '../decorators/errors/errors';

const prisma = new PrismaClient();

// TODO: consulta de temas con where de cerrado = false
export class temasRepositories {
    @validateRepo
    async getTema(){
       return await prisma.temas.findMany({
        select: {
            id: true,
            nombre: true,
            descripcion: true,
            fecha_creacion: true,
            fecha_modificacion: true
        },
        where: {
            cerrado: false
        }
       });
    }
}