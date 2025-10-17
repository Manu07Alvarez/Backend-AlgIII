import { PrismaClient, Usuario, Rol } from 'db';
import { validateRepo } from '../decorators/errors/errors.js';
import Repository from './Repository.js';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';
import { GetUserForRolDTO } from 'types/DTOs/UsuariosDTO.js';
import { DB } from 'db/types.js'
import { Kysely } from 'kysely'
import IUserRepository from './interfaces/IUserRepository.js';
export class UserRepository extends Repository<Usuario, "usuario"> implements IUserRepository {

  constructor(
	private readonly dbK: Kysely<DB>,
  ) {super("usuario");}


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
	public override async findAll(): Promise<Partial<Usuario[]>> {
		return this.dbK.selectFrom('Usuario').selectAll().execute();
	}
  
  
  @validateRepo
  async findById(searchId: number): Promise<Partial<Usuario>> {
    return await super["db"].findUniqueOrThrow({
      omit:  { contrasenia: true },
      where: { id: searchId}
    });
  }

	public async getPagination(params: PaginationParams): Promise<PaginationResults<Usuario>> {
		const { page, limit, search, sortBy, sortOrder } = params;
		const offset = (page - 1) * limit;
		const orderBy = sortBy ? { [sortBy]: sortOrder ?? 'asc' } : undefined;
		let users: Usuario[];
		let total: number;
		users = await super["db"].findMany({
			skip: offset,
			take: limit,
			orderBy,
			where:  search ? {
				OR: [
					{ email: { contains: search, mode: 'insensitive' } },
					{ nombre_apellido: { contains: search, mode: 'insensitive' } }
				]
			}: {},
		});
		total =  await super["db"].count({ 
			where: search ? {
				OR: [
					{ email: { contains: search, mode: 'insensitive' } },
					{ nombre_apellido: { contains: search, mode: 'insensitive' } }
				]
			}: {},
		})
	
		console.log(users);
		return {
			data: users,
			total,
			totalPages: Math.ceil(total / limit),
			currentPage: page
		};
	}
}

