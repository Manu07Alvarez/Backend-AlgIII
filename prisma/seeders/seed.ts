import { Prisma, PrismaClient, Reporte, Rol } from '../../src/generated/prisma/client.js';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {
  faker.seed(1);
  const length = 50;
  // Crear usuarios por email (clave única)
  const users = await Promise.all(
    Array.from({ length: length }).map(() => {
      const email = faker.internet.email();
      return prisma.usuario.upsert({
        where: { email },
        update: {},
        create: {
          nombre_apellido: faker.person.fullName(),
          email,
          contraseña: faker.internet.password(),
          rol: [Rol.ADMIN, Rol.MODERADOR, Rol.USUARIO][Math.floor(Math.random() * 3)],
        }
      })
    })
  );
  
 
  // Carreras
  const carreras = await Promise.all(
    Array.from({ length: length }).map(() => {
      const nombre = faker.company.name();
      return  prisma.carrera.upsert({
        where: { nombre },
        update: {},
        create: {
          nombre,
          descripcion: faker.lorem.sentence()
        }
      })
    }) 
  );

  // Tema
  const temas = await Promise.all(
    Array.from({ length: length }).map(() => {
      const randomCarrera = carreras[Math.floor(Math.random() * length)];
      const randomUser = users[Math.floor(Math.random() * length)];
      const nombre = faker.company.name();
      const titulo = faker.book.title();
      return  prisma.tema.upsert({
        where: { nombre }, // Podés cambiar el criterio según tu modelo real
        update: {},
        create: {
          nombre: nombre,
          titulo: titulo,
          contenido: faker.lorem.paragraphs(2),
          id_creador: randomUser.id,
          id_carrera: randomCarrera.id,
          fijado: true,
          cerrado: false
        }
      })
    })
  );

  // Post
  const posts = await Promise.all(
    Array.from({ length: length }).map((_,i) => {
      const randomTema = temas[Math.floor(Math.random() * length)];
      const randomUser = users[Math.floor(Math.random() * length)];
      return prisma.post.upsert({
        where: { id: i + 1 }, // Igual que con Tema, esto puede variar
        update: {},
        create: {
          titulo: `${i}` + faker.book.title() ,
          contenido: faker.lorem.paragraphs(2),
          id_autor: randomUser.id,
          id_tema: randomTema.id,
          published: true
        }
      });
    })
  );

  // Mensajes
  const mensajes = await Promise.all(
    Array.from({ length: length }).map((_, i) => {
      const randomPost = posts[Math.floor(Math.random() * length)];
      const randomUser = users[Math.floor(Math.random() * length)];
      return prisma.mensaje.upsert({
        where: { id: i+1 },
        update: {},
        create: {
          contenido: faker.hacker.phrase(),
          id_autor: randomUser.id,
          id_post: randomPost.id
        }
      })
    })
  );

  const mensajes2 = await Promise.all(
    Array.from({ length: length }).map((_, i) => {
      const randomPost = posts[Math.floor(Math.random() * length)];
      const randomMensaje = mensajes[Math.floor(Math.random() * length)];
      const randomUser = users[Math.floor(Math.random() * length)];
      return prisma.mensaje.upsert({
        where: { id: i+1 },
        update: {},
        create: {
          contenido: faker.hacker.phrase(),
          id_autor: randomUser.id,
          id_post: randomPost.id,
          id_mensaje: randomMensaje.id
        }
      })
    })
  );

  const reportesData = await Promise.all(
    Array.from({ length: length }).map((_, i) => {
      const randomUser = users[Math.floor(Math.random() * length)];
      const opciones = ['post', 'tema', 'mensaje', 'usuario'];
      const seleccionado = opciones[Math.floor(Math.random() * opciones.length)];



      const data: Prisma.ReporteCreateManyInput = {
        descripcion: faker.hacker.phrase(),
        resuelto: faker.datatype.boolean(),
        id_reportador: randomUser.id,
      };

      switch (seleccionado) {
        case 'post':
          data.post_id = posts[Math.floor(Math.random() * posts.length)].id;
          break;
        case 'tema':
          data.tema_id = temas[Math.floor(Math.random() * temas.length)].id;
          break;
        case 'mensaje':
          data.mensaje_id = mensajes[Math.floor(Math.random() * mensajes.length)].id;
          break;
        case 'usuario':
          data.usuario_id = users[Math.floor(Math.random() * users.length)].id;
          break;
      }

      return data;

    })
  );

  await prisma.reporte.createMany({ data: reportesData });
  console.log('✅ Seeder ejecutado correctamente con datos falsos.');
}

main()
  .catch((e) => {
    console.error('❌ Error en seeder:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });