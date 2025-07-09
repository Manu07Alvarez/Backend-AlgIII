import { PrismaClient, Tema } from '../../generated/prisma/client.js';
import { validateRepo } from '../decorators/errors/errors.js';
import repository from './Repository.js';
import ITemasRepositories from './interfaces/ITemasRepositories.js';

// TODO: consulta de temas con where de cerrado = false
export class temasRepositories extends repository<Tema> implements ITemasRepositories {
constructor (
    private readonly tema: PrismaClient ['tema'],
){super(tema)}
}