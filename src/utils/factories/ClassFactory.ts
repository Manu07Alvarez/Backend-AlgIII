import { UserRepository } from "../../repositories/UserRepository.ts";
import { PrismaClient } from '../../../generated/prisma/client.js';
import { UserService } from "../../services/UserService.ts";
import { UserController } from "../../controller/UserController.ts";
import { CarreraController } from "../../controller/CarreraController.ts";
import { CarreraService } from "../../services/CarreraService.ts"
import { temasController } from "../../controller/TemasController.ts";
import { TemaService } from "../../services/TemasService.ts";
import { temasRepositories } from "../../repositories/TemasRepositories.ts";
import { PostController }from "../../controller/postController.ts";
import { PostRepositories } from "../../repositories/postRepositories.ts";
import { postService } from "../../services/postService.ts"; 
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

export function createTemaController(): temasController {
  const repo = new temasRepositories(Prisma.tema);
  const service = new TemaService(repo);
  return new temasController(service);
}

export function createPostController(): PostController{
  const repo = new PostRepositories(Prisma.post);
  const service = new postService(repo);
  return new PostController(service);
}