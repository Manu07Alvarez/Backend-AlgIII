import { PrismaClient, Tema } from '../prisma/client.ts';
import { validateRepo } from '../decorators/errors/errors.ts';
import repository from './Repository.ts';
import ITemasRepository from './interfaces/ITemaRepository.ts';

// TODO: consulta de temas con where de cerrado = false
export class TemasRepository extends repository<Tema> implements ITemasRepository {
constructor (
    private readonly tema: PrismaClient ['tema'],
){super(tema)}
}