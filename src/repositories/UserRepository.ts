import { PrismaClient, Usuario, Rol } from 'db';
import { validateRepo } from '../decorators/errors/errors.js';
import Repository from './Repository.js';

export class UserRepository extends Repository<Usuario, "usuario">{

  constructor() {super("usuario");}


  @validateRepo
  async findByEmail(email: string): Promise<Partial<Usuario>> {
    return await super["db"].findUniqueOrThrow({
      select: { 
        id: true,
        nombre_apellido: true,
        rol: true
      },
      where: { email }
    })
  }
  
  
  @validateRepo
  async findById(searchId: number): Promise<Partial<Usuario>> {
    return await super["db"].findUniqueOrThrow({
      omit:  { contrasenia: true },
      where: { id: searchId}
    });
  }

  /* public async getPagination({ page, limit, search, sortBy, sortOrder }: { page: number; limit: number; search?: string; sortBy?: string; sortOrder?: "asc" | "desc"; }): Promise<Usuar[]; total: number; page: number; limit: number; }> {
    const offset = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { nombre_apellido: { contains: search, mode: 'insensitive' } }
      ];
    }

    const orderBy = sortBy ? { [sortBy]: sortOrder || 'asc' } : undefined;

    const [users, total] = await Promise.all([
      this.user.findMany({
        skip: offset,
        take: limit,
        where,
        orderBy,
        select: {
          email: true,
          nombre_apellido: true,
          rol: true,
          activo: true
        }
      }),
      this.user.count({ where })
    ]);

    const data = users.map(u => ({
      email: u.email,
      nombre_apellido: u.nombre_apellido ?? '',
      rol: u.rol as "USUARIO" | "ADMIN" | "MODERADOR",
      activo: u.activo
    }));

    return {
      data,
      total,
      page,
      limit
    };
  } */

}

