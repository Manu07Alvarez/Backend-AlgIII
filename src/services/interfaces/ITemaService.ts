import { Tema } from '../../generated/prisma/client.js';

export default interface ItemasService{
      findAll(): Promise<Tema[]>;
      findById(id: number): Promise<Partial<Tema>>;
      findByName(name: string): Promise<Partial<Tema>>;
      create(data: Tema): Promise<void>;
      activateOrDeactivate(id: number): Promise<void>;
      delete(id: number): Promise<void>;
      update(id: number, data: Tema): Promise<void>;
}