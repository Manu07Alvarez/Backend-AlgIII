import { UserRepository } from "../../repositories/UserRepository.js";
import IUserRepository from "../../repositories/interfaces/IUserRepository.js";
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
//Acá agrego los de curriculum
import { CurriculumController } from "../../controller/CurriculumController.js";
import { CurriculumService } from "../../services/CurriculumService.js";
import CurriculumRepository from "../../repositories/CurriculumRepository.js";

import MensajesRepository from "../../repositories/MensajesRespository.js";
import { ReportesController } from "../../controller/ReportesController.js";
import { CarreraRepository } from "../../repositories/CarreraRepository.js";
import { NotificacionController } from "../../controller/NotificacionController.js";
import NotificacionRepository from "../../repositories/NotificacionRepository.js";
import { NotificacionService } from "../../services/NotificacionService.js";
import { PrismaClient } from 'db';
import { PrismaPg } from '@prisma/adapter-pg'
import { DB } from "db/types.js";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5
})
const adapter = new PrismaPg(pool);
export const prismaApp = new PrismaClient({adapter});
const dialect = new PostgresDialect({
  pool: pool
});

export const dbK = new Kysely<DB>({
  dialect,
});



export function createUserController(): UserController {
  const repo = new UserRepository(dbK);
  const service = new UserService(repo);
  return new UserController(service);
};

export function createCarreraController(): CarreraController {
  const repo = new CarreraRepository();
  const service = new CarreraService(repo);
  return new CarreraController(service);
};

export function createTemaController(): TemasController {
  const repo = new TemasRepository();
  const service = new TemasService(repo);
  return new TemasController(service);
};
export function createPostController(): PostController{
  const repo = new PostRepository();
  const service = new PostService(repo);
  return new PostController(service);
};

export function createMensajeController(): MensajesController{
  const repo = new MensajesRepository(dbK);
  const service = new MensajesService(repo);
  return new MensajesController(service);
};

export function createNotificacionController(): NotificacionController{
  const repo = new NotificacionRepository();
  const service = new NotificacionService(repo);
  return new NotificacionController(service);
};

//Curriculum 
export function createCurriculumController(): CurriculumController{
  const repo = new CurriculumRepository();
  const service = new CurriculumService(repo);
  return new CurriculumController(service);
}


/**
 * Creates a new instance of ReportesController with the given Prisma client.
 *
 * @returns {ReportesController} a new instance of ReportesController
 */
 export function createReporteController(): ReportesController{
  const repo = new ReportsRepository(dbK);
  const service = new ReportsService(repo);
  return new ReportesController(service);
  
};

