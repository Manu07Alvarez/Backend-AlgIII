import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class temasRepositories {
    async getTema(){
        try {
            const tema = await prisma.temas.findMany({
                orderBy: {
                    id: "asc"
                },
            })
            return tema;
        }catch (err){
            console.error("Error al obtener los temas: ", err);
        }
    }
}