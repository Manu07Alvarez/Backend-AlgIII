import { Tema } from '../../generated/prisma/client.js';

export interface ItemasService{
      crearTema(data:Tema):Promise<void>;
      getTemaId(searchId:number): Promise<Partial<Tema>>;
      getTemaName(searchNombre:string): Promise<Partial<Tema>>;
      getTemaAll():Promise<Tema[]>;
      bajaTema(id:number): Promise<void>;
      updateTema(data:Tema):Promise<void>;
}