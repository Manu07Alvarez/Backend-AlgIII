import { Prisma, PrismaClient, Reporte, Rol } from 'db';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { faker } from '@faker-js/faker';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ['query', 'info', 'warn', 'error'] });

async function main() {
  faker.seed(1);
  const length = process.env.SEED_LENGTH ? parseInt(process.env.SEED_LENGTH) : 10;

  // =======================
  // USUARIOS
  // =======================
  const users = await Promise.all(
    Array.from({ length }).map(() => {
      const email = faker.internet.email();
      return prisma.usuario.upsert({
        where: { email },
        update: {},
        create: {
          alias: faker.person.firstName(),
          alumno_iseta: faker.datatype.boolean(),
          carrera_iseta: faker.book.title(),
          nombre_apellido: faker.person.fullName(),
          email,
          contrasenia: faker.internet.password(),
          rol: [Rol.ADMIN, Rol.MODERADOR, Rol.USUARIO][Math.floor(Math.random() * 3)],
        }
      });
    })
  );

  // =======================
  // CARRERAS
  // =======================
  const carreras = await Promise.all(
    Array.from({ length }).map(() => {
      const nombre = faker.company.name();
      return prisma.carrera.upsert({
        where: { nombre },
        update: {},
        create: {
          nombre,
          descripcion: faker.lorem.sentence()
        }
      });
    })
  );

  // =======================
  // TEMAS
  // =======================
  const temas = await Promise.all(
    Array.from({ length }).map(() => {
      const randomCarrera = carreras[Math.floor(Math.random() * length)];
      const randomUser = users[Math.floor(Math.random() * length)];
      const nombre = faker.company.name();
      const titulo = faker.book.title();
      return prisma.tema.upsert({
        where: { nombre },
        update: {},
        create: {
          nombre,
          titulo,
          contenido: faker.lorem.paragraphs(2),
          id_creador: randomUser.id,
          id_carrera: randomCarrera.id,
          fijado: true,
          cerrado: false
        }
      });
    })
  );

  // =======================
  // POSTS
  // =======================
  const posts = await Promise.all(
    Array.from({ length }).map((_, i) => {
      const randomTema = temas[Math.floor(Math.random() * length)];
      const randomUser = users[Math.floor(Math.random() * length)];
      return prisma.post.upsert({
        where: { id: i + 1 },
        update: {},
        create: {
          titulo: `${i}` + faker.book.title(),
          contenido: faker.lorem.paragraphs(2),
          id_autor: randomUser.id,
          id_tema: randomTema.id,
          published: true
        }
      });
    })
  );

  // =======================
  // MENSAJES
  // =======================
  const mensajes = await Promise.all(
    Array.from({ length }).map((_, i) => {
      const randomPost = posts[Math.floor(Math.random() * length)];
      const randomUser = users[Math.floor(Math.random() * length)];
      return prisma.mensaje.upsert({
        where: { id: i + 1 },
        update: {},
        create: {
          contenido: faker.hacker.phrase(),
          id_autor: randomUser.id,
          id_post: randomPost.id
        }
      });
    })
  );

  const mensajes2 = await Promise.all(
    Array.from({ length }).map((_, i) => {
      const randomMensaje = mensajes[Math.floor(Math.random() * length)];
      const randomUser = users[Math.floor(Math.random() * length)];
      return prisma.mensaje.upsert({
        where: { id: i + length },
        update: {},
        create: {
          contenido: faker.hacker.phrase(),
          id_autor: randomUser.id,
          id_post: randomMensaje.id_post,
          id_mensaje: randomMensaje.id
        }
      });
    })
  );

  // =======================
  // REPORTES
  // =======================
  const reportesData = await Promise.all(
    Array.from({ length }).map((_, i) => {
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

  // =======================
  // NOTIFICACIONES (con "type")
  // =======================
 // =======================
// NOTIFICACIONES (con campo "tipo" obligatorio)
// =======================
const notificaciones = await Promise.all(
  Array.from({ length }).map(async () => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const opciones = ['tema', 'post', 'mensaje'];
    const seleccionado = opciones[Math.floor(Math.random() * opciones.length)];

    const data: any = {
      contenido: faker.lorem.sentence(),
      id_usuario: randomUser.id,
      leido: faker.datatype.boolean(),
      tipo: seleccionado, // ✅ agregado correctamente
    };

    switch (seleccionado) {
      case 'tema':
        data.id_tema = temas[Math.floor(Math.random() * temas.length)].id;
        break;
      case 'post':
        data.id_post = posts[Math.floor(Math.random() * posts.length)].id;
        break;
      case 'mensaje':
        data.id_mensaje = mensajes[Math.floor(Math.random() * mensajes.length)].id;
        break;
    }

    return prisma.notificacion.create({
      data,
      include: { usuario: true, tema: true, post: true, Mensaje: true },
    });
  })
);


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
