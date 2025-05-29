
import { PrismaClient, Usuario } from '../../generated/prisma/client';
import { validateRepo } from '../decorators/errors/errors';

export class UserRepository {

  constructor(
    private readonly user: PrismaClient['usuario'],
  ) {}


  @validateRepo
  async findByEmail(email: string): Promise<Partial<Usuario> | null> {
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

  //FIXME: Por alguna razon no tira error al buscar un id inexistente
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
  async update(id: number, data: Usuario): Promise<Usuario> {
    await this.user.update({
      where: { id },
      data
    })
  }
}