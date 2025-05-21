import { UserRepository } from '../repositories/UserRepository';
import { Usuario } from '../../generated/prisma/client';
import { SignJWT, generateSecret } from 'jose';
import { compare } from 'bcrypt-ts';
import { IUserService } from './UserService.Interface';
export class UserService implements IUserService { 

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async login (email: string, contraseña : string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const contraseñaMatch = await compare(contraseña, user.contraseña as string); //VIGILAR: posible deuda funcional que no devuelva un Error.
    if (!contraseñaMatch) {
      throw new Error('Invalid password');
    }
    const secret = await generateSecret('HS256');
    return await new SignJWT({ id: user.id, nombre_apellido: user.nombre_apellido, rol: user.rol })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('4h')
          .sign(secret);
  }

  async getUser(id: number): Promise<Partial<Usuario | null>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async register(data: Usuario): Promise<boolean> {
    try {
      await this.userRepository.create(data);
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error('User not created');
      }
    }
    return true
  }
}