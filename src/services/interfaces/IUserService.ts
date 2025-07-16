import { Usuario } from "../../generated/prisma/client.js";

export interface IUserService {
  login(email: string, contraseña: string): Promise<string>;
  register(data: Usuario): Promise<void>;
  findById(id: number): Promise<Partial<Usuario>>;
  update(id: number, data: Usuario): Promise<void>;
  bajaUsuario(id: number, data: Usuario): Promise<void>;
}