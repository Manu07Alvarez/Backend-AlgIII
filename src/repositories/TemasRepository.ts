import { PrismaClient, Tema } from 'db';
import { validateRepo } from '../decorators/errors/errors.js';
import repository from './Repository.js';
import ITemasRepository from './interfaces/ITemaRepository.js';
import { query } from 'winston';

// TODO: consulta de temas con where de cerrado = false
export class TemasRepository extends repository<Tema> implements ITemasRepository {
  constructor(
    private readonly tema: PrismaClient['tema'],
  ) {
    super(tema);
  }

  @validateRepo
  async obtenerTemasAbiertos(): Promise<Tema[]> {
    return this.tema.findMany({
      where: {
        cerrado: false,
      },
    });
  }
}