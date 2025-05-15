import { PrismaClient, Usuario as User } from '../../generated/prisma/client';

export class Usuario {

  constructor(
    private readonly User: PrismaClient['usuario']
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.User.findUnique({
      where: { email }
    })
  }

  async signIn(data: SignIn): Promise<User | null> {
    this.findByEmail(data.email).then((user))
  }
}
type SignIn = {
  email: string;
  contraseña: string;
}