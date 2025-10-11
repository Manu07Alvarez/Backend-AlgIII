import { PrismaClient, Tema } from 'db';
import { validateRepo } from '../decorators/errors/errors.js';
import repository from './Repository.js';
import ITemasRepository from './interfaces/ITemaRepository.js';
import { query } from 'winston';

// TODO: consulta de temas con where de cerrado = false
export class TemasRepository extends repository<Tema, "tema"> implements ITemasRepository {
  constructor() {
    super("tema");
  }

  @validateRepo
  async obtenerTemasAbiertos(): Promise<Tema[]> {
    return super["db"].findMany({
      where: {
        cerrado: false,
      },
    });
  }
}