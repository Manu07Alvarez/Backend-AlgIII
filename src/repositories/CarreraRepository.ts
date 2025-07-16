
import { Carrera, PrismaClient } from '../generated/prisma/client.js';
import  ICarreraRepository  from './interfaces/ICarreraRepository.js';
import Repository from './Repository.js';
import { validateRepo } from '../decorators/errors/errors.js';
export class CarreraRepository extends Repository<Carrera> implements ICarreraRepository {
  constructor(
      private readonly carrera: PrismaClient['carrera'],
  ) {super(carrera);}



}