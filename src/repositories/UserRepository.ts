import { PrismaClient, Usuario, Rol } from 'db';
import { validateRepo } from '../decorators/errors/errors.js';
import Repository from './Repository.js';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';

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

 public async getPagination(params: PaginationParams): Promise<PaginationResults<any>> {
  const { page = 1, limit = 10, search, sortBy, sortOrder } = params;
  const offset = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { nombre_apellido: { contains: search, mode: 'insensitive' } }
        ]
      }
    : {};

  const orderBy = sortBy ? { [sortBy]: sortOrder ?? 'asc' } : undefined;

  type UsuarioSelect = {
    email: string;
    nombre_apellido: string | null;
    rol: Rol | null;
    activo: boolean;
  };

  const [users, total] = await Promise.all([
    super["db"].findMany({
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
    super["db"].count({ where })
  ]);

  const data = users.map((u: UsuarioSelect) => ({
    email: u.email,
    nombre_apellido: u.nombre_apellido ?? '',
    rol: u.rol ?? 'USUARIO',
    activo: u.activo
  }));

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  };
}


}

