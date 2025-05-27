import { PrismaClient, Carrera } from '../../generated/prisma/client';

export class CarreraRepository {
    constructor(
        private readonly carrera: PrismaClient['carrera'],
    ) {}
 

  public async create(data: Carrera): Promise<void> {
    await this.carrera.create({data});
  }

  public async findAll(): Promise<Carrera[]> {
    return await this.carrera.findMany()
  }

  public async findById(id: number): Promise<Partial<Carrera>> {
    return this.carrera.findUniqueOrThrow({
      omit: { 
        createdAt: true, 
        updatedAt: true 
      },
      where: { id }
    });
  }
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