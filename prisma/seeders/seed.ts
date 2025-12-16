import { Prisma, PrismaClient, Reporte, Rol } from 'db';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

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
  const users = Array.from({ length }).map((_, index) => ({
      id: index + 1,
      email: faker.internet.email() + 1,
      alias: faker.person.firstName(),
      alumno_iseta: faker.datatype.boolean(),
      carrera_iseta: faker.book.title(),
      nombre_apellido: faker.person.fullName(),
      contrasenia: faker.internet.password(),
      rol: [Rol.ADMIN, Rol.MODERADOR, Rol.USUARIO][Math.floor(Math.random() * 3)],
    })
  );

  // =======================
  // CARRERAS
  // =======================
  const carreras = Array.from({ length }).map((_, index) => ({
          id: index + 1,
          nombre: faker.company.name(),
          descripcion: faker.lorem.sentence()
      })
  );

  // =======================
  // TEMAS
  // =======================
  const temas = Array.from({ length }).map((_, index) => ({
      id: index + 1,
      nombre: faker.company.name(),
      titulo: faker.book.title(),
      contenido: faker.lorem.paragraphs(2),
      id_creador: users[Math.floor(Math.random() * length)].id,
      id_carrera: carreras[Math.floor(Math.random() * length)].id,
    })
  );

  // =======================
  // POSTS
  // =======================
  const posts = Array.from({ length }).map((_, i) => ({
      id: i + 1,
      titulo: `${i}` + faker.book.title(),
      contenido: faker.lorem.paragraphs(2),
      id_autor: users[Math.floor(Math.random() * length)].id,
      id_tema: temas[Math.floor(Math.random() * length)].id,
      published: true,
      likes: randomInt(0, 1000),
      fijado: faker.datatype.boolean()
    }
  ));

  // =======================
  // MENSAJES
  // =======================
  const mensajes = await Promise.all(
    Array.from({ length }).map((_, i) => ({
      id: i + 1,
      contenido: faker.hacker.phrase(),
      id_autor: users[Math.floor(Math.random() * length)].id,
      id_post: posts[Math.floor(Math.random() * length)].id,
      likes: randomInt(0, 1000)
    })
  ));

  const mensajes2 = Array.from({ length }).map((_, i) => {
      const randomMensaje = mensajes[Math.floor(Math.random() * length)];
      return {
        id: i + 1,
        contenido: faker.hacker.phrase(),
        id_autor: users[Math.floor(Math.random() * length)].id,
        id_post: randomMensaje.id_post,
        id_mensaje: randomMensaje.id
      }
    }
  );
// Curriculum
  const curriculums = Array.from({ length: length }).map((_,i) => {
    const randomUser = users[Math.floor(Math.random() * length)];   
    return {
      id: i + 1,
      id_autor: randomUser.id,
      nombre: faker.person.fullName(),
      apellido: faker.person.lastName(),
      fecha_nacimiento: faker.date.past({ years: 30 }),
      telefono: faker.phone.number(),
      email: randomUser.email,
      presentacion: faker.lorem.paragraph(),
      experiencia: faker.lorem.paragraphs(2),
      ultimo_titulo: faker.lorem.paragraph(),
      habilidades_blandas: faker.lorem.words(5),
      habilidades_duras: faker.lorem.words(5),
      idiomas: 'Inglés, Español',
      disponibilidad_horaria: 'Full-time',
      perfil_in: faker.internet.url(),
    }
  })

  // =======================
  // REPORTES
  // =======================
  const reportesData = Array.from({ length }).map((_, i) => {
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
    });

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

    const data: Prisma.notificacionCreateManyInput = {
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

    return data;
  })
);
  await prisma.$transaction(async (tx) => {
    await tx.usuario.createMany({
      data: users,
      skipDuplicates: true
    });
    await tx.carrera.createMany({
      data: carreras,
      skipDuplicates: true
    });
    await tx.tema.createMany({
      data: temas,
      skipDuplicates: true
    });
    await tx.post.createMany({
      data: posts,
      skipDuplicates: true
    });
    await tx.mensaje.createMany(
      {
        data: mensajes,
        skipDuplicates: true}
    );
    await tx.mensaje.createMany(
      {
        data: mensajes2,
        skipDuplicates: true
      }
    )
    await tx.curriculum.createMany({
      data: curriculums,
      skipDuplicates: true
    });
    await tx.reporte.createMany({
      data: reportesData,
      skipDuplicates: true
    });
    await tx.notificacion.createMany({
      data: notificaciones,
      skipDuplicates: true
    });
  });

 await prisma.$queryRaw`SELECT setval(
  pg_get_serial_sequence('"Tema"', 'id'),
  (SELECT MAX(id) FROM "Tema")
);`;
 await prisma.$queryRaw`SELECT setval(
  pg_get_serial_sequence('"Post"', 'id'),
  (SELECT MAX(id) FROM "Post")
);`;
  await prisma.$queryRaw`SELECT setval(
  pg_get_serial_sequence('"Usuario"', 'id'),
  (SELECT MAX(id) FROM "Usuario")
);`;
  await prisma.$queryRaw`SELECT setval(
  pg_get_serial_sequence('"Mensaje"', 'id'),
  (SELECT MAX(id) FROM "Mensaje")
);`;
 await prisma.$queryRaw`SELECT setval(
  pg_get_serial_sequence('"notificacion"', 'id'),
  (SELECT MAX(id) FROM "notificacion")
);`;

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
