import {PrismaClient} from '@prisma/client';
import { create } from 'domain';
const prisma = new PrismaClient();

async function main() {
    const sofia = await prisma.user.upsert({
        where: { email: 'sofia@gmail.com' },
        update:{},
        create: {
            email: 'sofia@gmail.com',
            password: 'sofia123',
            name: 'sofia',
            post :{
                create: {
                    title: 'Primer post de sofia',
                    content: 'Contenido del primer post de sofia',
                    published: true,
                },
            },
        },
    })

    const juan = await prisma.user.upsert({
        where: { email: 'juan@gmail.com' },
        update:{},
        create: {
            email: 'juan@gmail.com',    
            password: 'juan123',
            name: 'juan',
            post: {
                create: {
                    title: 'Primer post de juan',
                    content: 'Contenido del primer post de juan',
                    published: true,
                },
            },
        },
    })

    console.log({ sofia, juan });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });