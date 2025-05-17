import { UserRepository as User } from '../repositories/UserRepository';
import { Usuario } from '../../generated/prisma/client';
import { SignJWT, generateSecret } from 'jose';
export class UserService { 

  constructor(
    private readonly userRepository: User
  ) {}

  async login (data: Usuario): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('User not found');
    }
    const secret = await generateSecret('HS256');
    return await new SignJWT({ id: user.id })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('2h')
          .sign(secret);
  }

  async getUser(id: number): Promise<Partial<Usuario | null>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async signUp(data: Usuario): Promise<boolean> {
    const user =  await this.userRepository.create(data);
    if (!user) {
      throw new Error('User not created');
    }
    return true;
  }

}
