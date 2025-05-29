import { UserRepository } from "../../repositories/UserRepository";
import { PrismaClient } from "../../../generated/prisma/client";
import { UserService } from "../../services/UserService";
import { UserController } from "../../controller/UserController.js";

const PrismaClientUser = new PrismaClient;
export function createUserController(): UserController {
  const repo = new UserRepository(PrismaClientUser.usuario);
  const service = new UserService(repo);
  return new UserController(service);
}