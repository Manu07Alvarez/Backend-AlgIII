import { Tema } from '../../prisma/client.ts';

export interface ItemasService{
      findAll(): Promise<Tema[]>;
      findById(id: number): Promise<Tema | null>;
      findByName(name: string): Promise<Tema | null>;
      create(data: Tema): Promise<void>;
      activateOrDeactivate(id: number): Promise<void>;
      delete(id: number): Promise<void>;
      update(id: number, data: Tema): Promise<void>;
}