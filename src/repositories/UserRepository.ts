import { PrismaClient, Usuario} from '../../generated/prisma/client';

export class UserRepository {

  constructor(
    private readonly user: PrismaClient['usuario'],
  ) {}

  

  async findByEmail(email: string): Promise<Partial<Usuario> | null> {
    return await this.user.findUnique({
      select: { 
        id: true,
        nombre_apellido: true,
        contraseña: true,
      },
      where: { email }
    })
  }

  async findById(id: number): Promise<Partial<Usuario | null>> {
    return await this.user.findUnique({
      omit: { contraseña: true },
      where: { id }
    })
  }
  async create(data: Usuario): Promise<Usuario> {
    return await this.user.create({
      data
    })
  }
}