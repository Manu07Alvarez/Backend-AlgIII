
import { Carrera, PrismaClient } from '../../generated/prisma/client.js';
import  IRepository  from './interfaces/ICarreraRepository.ts';

import Repository from './Repository.ts';

export class CarreraRepository extends Repository<Carrera> implements IRepository<Carrera> {
  constructor(
      private readonly carrera: PrismaClient['carrera'],
  ) {super(carrera);}



}