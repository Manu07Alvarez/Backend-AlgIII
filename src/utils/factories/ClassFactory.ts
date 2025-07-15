import { UserRepository } from "../../repositories/UserRepository.ts";
import { PrismaClient } from '../../../generated/prisma/client.js';
import { UserService } from "../../services/UserService.ts";
import { UserController } from "../../controller/UserController.ts";
import { CarreraController } from "../../controller/CarreraController.ts";
import { CarreraService } from "../../services/CarreraService.ts"
import { TemasController } from "../../controller/TemasController.ts";
import { TemasService } from "../../services/TemasService.ts";
import { TemasRepository } from "../../repositories/TemasRepository.ts";
import { PostController }from "../../controller/PostController.ts";
import { PostRepository } from "../../repositories/PostRepository.ts";
import { PostService } from "../../services/PostService.ts"; 
const {CarreraRepository} = await import('../../repositories/CarreraRepository.ts');
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