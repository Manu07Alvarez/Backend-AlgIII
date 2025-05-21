import { PrismaClient, Usuario } from '../../generated/prisma/client';
import { validateRepo } from '../decorators/errors/errors';
export class UserRepository {

  constructor(
    private readonly user: PrismaClient['usuario'],
  ) {}


  @validateRepo
  async findByEmail(email: string): Promise<Partial<Usuario> | null> {
    return await this.user.findUnique({
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
  async bajaUsuario(id: number): Promise<void> {
    await this.user.delete({
      where: { id }
    })
  }	

  @validateRepo
  async findById(id: number): Promise<Partial<Usuario> | null> {
    return await this.user.findUnique({
      omit: { contraseña: true },
      where: { id }
    })
  }

  @validateRepo
  async create(data: Usuario): Promise<void> {
    await this.user.create({
      data
    })
  }

  @validateRepo
  async update(id: number, data: Usuario): Promise<Usuario> {
    await this.user.update({
      where: { id },
      data
    })
  }
}