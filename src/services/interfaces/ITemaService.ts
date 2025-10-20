import { GetTemaForRolDTO } from 'types/DTOs/TemasDTO.js';
import { Tema } from '../../generated/prisma/client.js';

export default interface ItemasService{
      findAll(): Promise<GetTemaForRolDTO[]>;
      findById(id: number): Promise<GetTemaForRolDTO>;
      findByName(name: string): Promise<GetTemaForRolDTO>;
      create(data: Partial<Tema>): Promise<void>;
      activateOrDeactivate(id: number): Promise<void>;
      delete(id: number): Promise<void>;
      update(id: number, data: Partial<Tema>): Promise<void>;
      obtenerTemasAbiertos(): Promise<GetTemaForRolDTO[]>;
}