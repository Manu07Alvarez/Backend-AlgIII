
import { PrismaClient, Usuario } from '../../generated/prisma/client.js';
import { validateRepo } from '../decorators/errors/errors.ts';
import IRepository from './interfaces/IUserRepository.ts';
import Repository from './Repository.ts';

export class UserRepository extends Repository<Usuario> implements IRepository<Usuario> {

  constructor(
    private readonly user: PrismaClient['usuario'],
  ) {super(user);}


  @validateRepo
  async findByEmail(email: string): Promise<Partial<Usuario>> {
    return await this.entity.findUniqueOrThrow({
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
  async findById(searchId: number): Promise<Partial<Usuario>> {
    return await this.entity.findUniqueOrThrow({
      omit:  { contraseña: true },
      where: { id: searchId}
    });
  }
}