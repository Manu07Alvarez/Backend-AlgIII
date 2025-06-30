import { validateRepo, validateService } from "../decorators/errors/errors.js";
import { temasRepositories } from "../repositories/TemasRepositories.js";
import { Tema, PrismaClient } from "../prisma/client.js";

export class TemaService {
    constructor(
        private readonly TemasRepositories : temasRepositories,){}

    //obtiene todos los temas
    @validateService('ERROR tema not found: ')
    public async getTemaAll():Promise<Tema[]>{
        return await this.TemasRepositories.getTemaAll();
    }

    //obtiene un tema por id
    @validateService('ERROR tema not found')
    public async getTemaId(searchId:number): Promise<Partial<Tema>>{
        return await this.TemasRepositories.getTemaId(searchId);
    }

    //obtiene un tema por su nombre
    @validateService('ERROR tema not found')
    public async getTemaName(searchNombre:string): Promise<Partial<Tema>> {
        return await this.TemasRepositories.GetTemaName(searchNombre);
    }

    // dar de baja un tema
    @validateService('ERROR tema not low ')
    public async bajaTema(id:number): Promise<void>{
        return await this.TemasRepositories.BajaTema(id);
    }

    @validateService('ERROR tema not created')
    public async crearTema(data:Tema):Promise<void>{
        return await this.TemasRepositories.crearTema(data);
    }

    @validateService('ERROR tema not update')
    public async updateTema(data:Tema):Promise<void>{
        return await this.TemasRepositories.updateTema(data)
    }

    
}

