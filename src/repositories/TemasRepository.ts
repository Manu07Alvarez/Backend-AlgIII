import { PrismaClient, Tema } from '../generated/prisma/client.js';
import { validateRepo } from '../decorators/errors/errors.js';
import repository from './Repository.js';
import ITemasRepository from './interfaces/ITemaRepository.js';

// TODO: consulta de temas con where de cerrado = false
export class TemasRepository extends repository<Tema> implements ITemasRepository {
constructor (
    private readonly tema: PrismaClient ['tema'],
){super(tema)}
}