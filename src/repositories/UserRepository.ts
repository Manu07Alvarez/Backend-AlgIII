import { PrismaClient, Usuario } from 'db';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';
import { validateRepo } from '../decorators/errors/errors.js';
import Repository from './Repository.js';

export class UserRepository extends Repository<Usuario> {
  constructor(private readonly user: PrismaClient['usuario']) {
    super(user);
  }

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
      omit:  { contraseña: true },
      where: { id: searchId }
    });
  }

  public async getPagination({
    page,
    limit,
    search,
    sortBy,
    sortOrder
  }: PaginationParams): Promise<PaginationResults<{
    email: string;
    nombre_apellido: string;
    contrasena: string;
    rol: "USUARIO" | "ADMIN" | "MODERADOR";
    activo: boolean;
  }>> {

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
          contraseña: true,
          rol: true,
          activo: true
        }
      }),
      this.user.count({ where })
    ]);

    const data = users.map(u => ({
      email: u.email,
      nombre_apellido: u.nombre_apellido ?? '',
      contrasena: u.contraseña,
      rol: u.rol as "USUARIO" | "ADMIN" | "MODERADOR",
      activo: u.activo
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      totalPages,
      currentPage: page
    };
  }
}
