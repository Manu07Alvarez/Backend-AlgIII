
import { PrismaClient, Usuario } from '../../generated/prisma/client.js';
import { validateRepo } from '../decorators/errors/errors.ts';

export class UserRepository {

  constructor(
    private readonly user: PrismaClient['usuario'],
  ) {}


  @validateRepo
  async findByEmail(email: string): Promise<Partial<Usuario>> {
    return await this.user.findUniqueOrThrow({
      select: { 
        id: true,
        nombre_apellido: true,
        contraseña: true,
        rol: true
      },
      where: { email }
    })
  }


  @validateRepo
  async bajaUsuario(searchId: number): Promise<void> {
    await this.user.delete({
      where: { id: searchId }
    })
  }	
  
  
  @validateRepo
  async findById(searchId: number): Promise<Partial<Usuario>> {
    return await this.user.findUniqueOrThrow({
      omit:  { contraseña: true },
      where: { id: searchId}
    });
  }

  @validateRepo
  async create(data: Usuario): Promise<void> {
    await this.user.create({
      data
    })
  }

  @validateRepo
  async update(id: number, data: Usuario): Promise<void> {
    await this.user.update({
      where: { id },
      data
    })
  }
}