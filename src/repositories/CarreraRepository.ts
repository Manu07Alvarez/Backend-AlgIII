
import { Carrera, PrismaClient } from 'db';
import  ICarreraRepository  from './interfaces/ICarreraRepository.js';
import Repository from './Repository.js';
import { validateRepo } from '../decorators/errors/errors.js';
export class CarreraRepository extends Repository<Carrera, "carrera"> implements ICarreraRepository {
  constructor() {super("carrera");}



}