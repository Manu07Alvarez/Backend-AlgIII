import { UserRepository } from "../../repositories/UserRepository";
import { PrismaClient } from "../../../generated/prisma/client";
import { UserService } from "../../services/UserService";
import { UserController } from "../../controller/UserController.js";

const Prisma = new PrismaClient;
export function createUserController(): UserController {
  const repo = new UserRepository(Prisma.usuario);
  const service = new UserService(repo);
  return new UserController(service);
}

export function createCarreraController(): CarreraController {
  const repo = new CarreraRepository(Prisma.carrera);
  const service = new UserService(repo);
  return new UserController(service);
}