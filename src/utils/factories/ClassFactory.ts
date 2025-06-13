
import { UserRepository } from "../../repositories/UserRepository.ts";
import { PrismaClient } from '../../../generated/prisma/client.js';
import { UserService } from "../../services/UserService.ts";
import { UserController } from "../../controller/UserController.ts";
import { CarreraController } from "../../controller/CarreraController.ts";
import { CarreraService } from "../../services/CarreraService.ts"
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