import { PrismaClient, Usuario, Rol } from 'db';
import { validateRepo } from '../decorators/errors/errors.js';
import Repository from './Repository.js';

export class UserRepository extends Repository<Usuario> {

  constructor(
    private readonly user: PrismaClient['usuario'],
  ) { super(user); }

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
    });
  }

  @validateRepo
  async findById(searchId: number): Promise<Partial<Usuario>> {
    return await this.entity.findUniqueOrThrow({
      select: { 
        id: true,
        nombre_apellido: true,
        email: true,
        rol: true,
        activo: true,
        createdAt: true,
        updatedAt: true
      },
      where: { id: searchId }
    });
  }

}
