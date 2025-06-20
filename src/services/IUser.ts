import { Usuario } from "../prisma/client.ts";

export interface IUserService {
  login(email: string, contraseña: string): Promise<string>;
  register(data: Usuario): Promise<void>;
  getUser(id: number): Promise<Partial<Usuario>>;
  update(id: number, data: Usuario): Promise<void>;
}