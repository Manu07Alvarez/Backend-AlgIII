
import { PrismaClient, Usuario } from '../generated/prisma/client.js';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';
import { validateRepo } from '../decorators/errors/errors.js';
import IRepository from './interfaces/IUserRepository.js';
import Repository from './Repository.js';
//import { skip } from 'node:test'; TODO: Lo comente porque daba error en la compilacion

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

  public async getPagination({page, limit}: PaginationParams): Promise<PaginationResults<Usuario>> {
    const offset = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.user.findMany({ skip: offset, take: limit }),
      this.user.count()
    ]);

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    }
  }

}

