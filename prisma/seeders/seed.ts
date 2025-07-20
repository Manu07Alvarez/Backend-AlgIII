import { PrismaClient, Rol } from '../../src/generated/prisma/client.js';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Crear usuarios por email (clave única)
  const usuarios = await Promise.all(
    ['admin@example.com', 'mod@example.com', 'user@example.com'].map((email, i) =>
      prisma.usuario.upsert({
        where: { email },
        update: {},
        create: {
          nombre_apellido: faker.person.fullName(),
          email,
          contraseña: faker.internet.password(),
          rol: [Rol.ADMIN, Rol.MODERADOR, Rol.USUARIO][i],
        }
      })
    )
  );

  const [admin, moderador, user] = usuarios;

  // Carreras
  const carreras = await Promise.all(
    ['Ingeniería en Sistemas', 'Administración'].map(nombre =>
      prisma.carrera.upsert({
        where: { nombre },
        update: {},
        create: {
          nombre,
          descripcion: faker.lorem.sentence()
        }
      })
    )
  );

  // Tema
  const tema = await prisma.tema.upsert({
    where: { id: 1 }, // Podés cambiar el criterio según tu modelo real
    update: {},
    create: {
      nombre: 'Tema principal',
      titulo: 'Bienvenidos al foro',
      contenido: faker.lorem.paragraphs(2),
      id_creador: user.id,
      id_carrera: carreras[0].id,
      fijado: true,
      cerrado: false
    }
  });

  // Post
  const post = await prisma.post.upsert({
    where: { id: 1 }, // Igual que con Tema, esto puede variar
    update: {},
    create: {
      titulo: faker.lorem.sentence(),
      contenido: faker.lorem.paragraphs(2),
      id_autor: user.id,
      id_tema: tema.id,
      published: true
    }
  });

  // Mensajes
  const mensajePrincipal = await prisma.mensaje.upsert({
    where: { id: 1 },
    update: {},
    create: {
      contenido: faker.hacker.phrase(),
      id_autor: user.id,
      id_post: post.id
    }
  });

  await prisma.mensaje.upsert({
    where: { id: 2 },
    update: {},
    create: {
      contenido: faker.hacker.phrase(),
      id_autor: admin.id,
      id_post: post.id,
      id_mensaje: mensajePrincipal.id
    }
  });

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