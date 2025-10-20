import ITemaRepository from "../repositories/interfaces/ITemaRepository.js";
import { Tema, PrismaClient } from "db";
import ITemasService from "./interfaces/ITemaService.js";
import service from "./Service.js";
import { validateService } from "../decorators/errors/errors.js";
import { GetTemaForRolDTO, tema_mapper } from "types/DTOs/TemasDTO.js";
import { toUser } from "utils/mapper/ForUserRol.js";

export class TemasService extends service<Tema> implements ITemasService {
  constructor(
    private readonly TemasRepositories: ITemaRepository,
  ) {
    super(TemasRepositories, 'Tema');
  }

    @validateService('Temas not found: ')
    async findAll(): Promise<GetTemaForRolDTO[]> {
        const temas = await this.TemasRepositories.findAll() as Tema[];
        return await toUser<GetTemaForRolDTO, Tema, typeof tema_mapper>(temas, tema_mapper);
        
    }
    
    @validateService('Tema not found: ')
    async findById(id: number): Promise<GetTemaForRolDTO> {
        const tema = await this.TemasRepositories.findById(id) as Tema;
        return await toUser<GetTemaForRolDTO, Tema, typeof tema_mapper>(tema, tema_mapper).then(temas => temas[0]);
    }

    @validateService('Tema not found: ')
    async findByName(name: string): Promise<GetTemaForRolDTO> {
        const tema = await this.TemasRepositories.findByName(name) as Tema;
        return await toUser<GetTemaForRolDTO, Tema, typeof tema_mapper>(tema, tema_mapper).then(temas => temas[0]);
    }

    @validateService('Temas not found: ')
    async obtenerTemasAbiertos(): Promise<GetTemaForRolDTO[]> {
        const temas = await this.TemasRepositories.obtenerTemasAbiertos();
        return await toUser<GetTemaForRolDTO, Tema, typeof tema_mapper>(temas, tema_mapper);
    }
}


