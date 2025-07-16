import { Tema } from "../../generated/prisma/client.js";
export default interface ITemaRepository {
      create(data: Tema): Promise<void>;
      findById(id: number): Promise<Partial<Tema>>;
      findAll(): Promise<Tema[]>;
      update(id: number, data: Tema): Promise<void>;
      delete(id: number): Promise<void>;
      findByName(name: string): Promise<Partial<Tema>>;
      activateOrDeactivate(id: number): Promise<void>;
}