
import { Carrera, PrismaClient } from '../../generated/prisma/client.js';
import  ICarreraRepository  from './interfaces/ICarreraRepository.ts';
import Repository from './Repository.ts';
import { validateRepo } from '../decorators/errors/errors.ts';
export class CarreraRepository extends Repository<Carrera> implements ICarreraRepository {
  constructor(
      private readonly carrera: PrismaClient['carrera'],
  ) {super(carrera);}



}