
import { Carrera, PrismaClient } from '../../generated/prisma/client.js';

import { validateRepo } from '../decorators/errors/errors.ts';

export class CarreraRepository {
  constructor(
      private readonly carrera: PrismaClient['carrera'],
  ) {}

  @validateRepo
  public async update(id: number, data: Carrera): Promise<void> {
    await this.carrera.update({
      where: { id },
      data
    })
  }


  @validateRepo
  public async activateOrDeactivate(searchId: number): Promise<void> {
    const user = await this.findById(searchId);
    await this.carrera.update({
      where: { id: searchId },
      data: {
        activa: !user.activa,
      }
    })
  }

  @validateRepo
  public async create(data: Carrera): Promise<void> {
    await this.carrera.create({data});
  }

  @validateRepo
  public async findAll(): Promise<Carrera[]> {
    console.log("asd")
    return await this.carrera.findMany()
  }

  @validateRepo
  public async findById(searchId: number): Promise<Partial<Carrera>> {
    return this.carrera.findUniqueOrThrow({
      omit: { 
        createdAt: true, 
        updatedAt: true 
      },
      where: { id: searchId }
    });
  }

  @validateRepo
  public async findByName(searchNombre: string): Promise<Partial<Carrera>> {
    return this.carrera.findUniqueOrThrow({
    omit: { 
      createdAt: true, 
      updatedAt: true 
    },
    where: { nombre: searchNombre }
    });
  }
}