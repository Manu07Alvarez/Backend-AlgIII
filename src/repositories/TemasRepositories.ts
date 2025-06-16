import { PrismaClient, tema } from '../../generated/prisma/client.js';
import { validateRepo } from '../decorators/errors/errors.js';

const prisma = new PrismaClient();

// TODO: consulta de temas con where de cerrado = false
export class temasRepositories {

    // busca todo los temas que hay en la tabla
    @validateRepo
    async getTemaAll():Promise<tema[]>{
        console.log("get tema")
        return await prisma.tema.findMany()
    }

    //busca los temas por id
    @validateRepo
    async getTemaId(searchId:number):Promise<Partial<tema>>{
        return prisma.tema.findUniqueOrThrow({
            where: { id: searchId },
            omit: {
                createdAt: true,
                updatedAt: true
            }
        });
    }

    @validateRepo
    async GetTemaName(searchNombre:string): Promise<Partial<tema>> {
           return prisma.tema.findFirstOrThrow({
            where: { nombre: searchNombre },
            select: {
                id: true,
                nombre: true,
            }
        });
    }

    @validateRepo
    async BajaTema(id: number):Promise<void>{
        await prisma.tema.delete({
            where: {id: id} // se pasa el id que se quiere eliminar
        });
    }

    @validateRepo
    async crearTema(data:tema): Promise<void> {
        await prisma.tema.create({data});
    }

    @validateRepo
    async updateTema(data: tema): Promise<void> {
        await prisma.tema.update({
            where: { id: data.id },
            data
        })
    }
}