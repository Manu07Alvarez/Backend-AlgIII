import { PrismaClient, Usuario, Rol } from 'db';
import { validateRepo } from '../decorators/errors/errors.js';
import Repository from './Repository.js';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';

export class UserRepository extends Repository<Usuario, "usuario"> {

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

 public async getPagination(params: PaginationParams): Promise<PaginationResults<Partial<Usuario>>> {
  const { page, limit, search, sortBy, sortOrder } =params;
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
  let users: Partial<Usuario>[];
  let total: number;


  if(super['user'] != null){
    [users, total] =  ([
    
     await super["db"].findMany({
      skip: offset,
      take: limit,
      orderBy,
      select: {
        email: true,
        nombre_apellido: true,
        rol: true,
        activo: true
      }
    }),
   await super["db"].count({ where })
  ]);
    }  else {
   [users, total] =  ([
      await super["db"].findMany({
        skip: offset,
        take: limit,
        orderBy,
        select: {
          email: true,
          nombre_apellido: true,
          rol: true,
          activo: true
        }
    }),
    await super["db"].count({ where })
    ]);
  }
  console.log(users);
   return {
    data: users,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  };
}
}

