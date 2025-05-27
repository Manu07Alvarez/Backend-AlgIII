import { PrismaClient, Carrera } from '../../generated/prisma/client';
import { validateRepo } from '../decorators/errors/errors';

export class CarreraRepository {
    constructor(
        private readonly carrera: PrismaClient['carrera'],
    ) {}
 
  @validateRepo
  public async create(data: Carrera): Promise<void> {
    await this.carrera.create({data});
  }

  @validateRepo
  public async findAll(): Promise<Carrera[]> {
    return await this.carrera.findMany()
  }

  @validateRepo
  public async findById(id: number): Promise<Partial<Carrera>> {
    return this.carrera.findUniqueOrThrow({
      omit: { 
        createdAt: true, 
        updatedAt: true 
      },
      where: { id }
    });
  }

  @validateRepo
  public async findByName(nombre: string): Promise<Partial<Carrera>> {
    return this.carrera.findUniqueOrThrow({
    omit: { 
      createdAt: true, 
      updatedAt: true 
    },
    where: { nombre }
    });
  }
}