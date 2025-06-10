import { UserRepository } from "../../repositories/UserRepository";
import { PrismaClient } from "../../../generated/prisma/client";
import { UserService } from "../../services/UserService";
import { UserController } from "../../controller/UserController.js";
import { CarreraController } from "../../controller/CarreraController";
import { CarreraService } from "../../services/CarreraService";
import { CarreraRepository } from "../../repositories/CarreraRepository";

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