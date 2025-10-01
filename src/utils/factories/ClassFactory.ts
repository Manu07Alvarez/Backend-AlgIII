import { UserRepository } from "../../repositories/UserRepository.js";
import { UserService } from "../../services/UserService.js";
import { UserController } from "../../controller/UserController.js";
import { CarreraController } from "../../controller/CarreraController.js";
import { CarreraService } from "../../services/CarreraService.js"
import { TemasController } from "../../controller/TemasController.js";
import { TemasService } from "../../services/TemasService.js";
import { TemasRepository } from "../../repositories/TemasRepository.js";
import { PostController }from "../../controller/PostController.js";
import { PostRepository } from "../../repositories/PostRepository.js";
import { PostService } from "../../services/PostService.js"; 
import { MensajesController } from "../../controller/MensajesController.js";
import { MensajesService } from "../../services/MensajesService.js";
import { ReportsRepository } from "../../repositories/ReportsRepository.js";
import { ReportsService } from "../../services/ReportsService.js";
import MensajesRepository from "../../repositories/MensajesRespository.js";
import { ReportesController } from "../../controller/ReportesController.js";
import { CarreraRepository } from "../../repositories/CarreraRepository.js";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { DB } from "../../generated/prisma/types.js";
import { Kysely, MysqlDialect } from "kysely";
import { PrismaClient } from 'db';
import { createPool } from "mysql2";
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_TO_USE,
  connectionLimit: 5,
});
const Prisma = new PrismaClient({adapter});
const dialect = new MysqlDialect({
  pool: createPool({
    database: process.env.DATABASE_TO_USE,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    connectionLimit: 5,
    waitForConnections: true
  })
})

const db = new Kysely<DB>({
  dialect
})



export function createUserController(): UserController {
  const repo = new UserRepository(Prisma.usuario);
  const service = new UserService(repo);
  return new UserController(service);
}

export function createCarreraController(): CarreraController {
  const repo = new CarreraRepository(Prisma.carrera);
  const service = new CarreraService(repo);
  return new CarreraController(service);
}

export function createTemaController(): TemasController {
  const repo = new TemasRepository(Prisma.tema);
  const service = new TemasService(repo);
  return new TemasController(service);
}

export function createPostController(): PostController{
  const repo = new PostRepository(Prisma.post);
  const service = new PostService(repo);
  return new PostController(service);
}

export function createMensajeController(): MensajesController{
  const repo = new MensajesRepository(Prisma.mensaje);
  const service = new MensajesService(repo);
  return new MensajesController(service);
}

/**
 * Creates a new instance of ReportesController with the given Prisma client.
 *
 * @returns {ReportesController} a new instance of ReportesController
 */
export function createReporteController(): ReportesController{
  const repo = new ReportsRepository(db,Prisma.reporte);
  const service = new ReportsService(repo);
  return new ReportesController(service);
}