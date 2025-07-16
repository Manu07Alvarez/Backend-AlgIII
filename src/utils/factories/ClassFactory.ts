import { UserRepository } from "../../repositories/UserRepository.js";
import { PrismaClient } from '../../generated/prisma/client.js';
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
const {CarreraRepository} = await import('../../repositories/CarreraRepository.js');
const Prisma = new PrismaClient;

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