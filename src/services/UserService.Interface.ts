import { Usuario } from "../../generated/prisma";

export interface IUserService {
  login(email: string, contraseña: string): Promise<string>;
  register(data: Usuario): Promise<boolean>;
  getUser(id: number): Promise<unknown>;
}