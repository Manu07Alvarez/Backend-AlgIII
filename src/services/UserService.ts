import { UserRepository } from '../repositories/UserRepository';
import { Usuario } from '../../generated/prisma/client';
import { SignJWT } from 'jose';
import { handlerError } from '../decorators/errors/errors';
import { getPublicKey } from '../utils/auth/KeyGen';
import { compare } from 'bcrypt-ts';
import { IUserService } from './UserService.Interface';
const publicKey = await getPublicKey();
export class UserService implements IUserService { 

  constructor(
    private readonly userRepository: UserRepository
  ) {}
  async bajaUsuario(id: number, data: Usuario): Promise<void> {
    data.activo = false;
    await this.userRepository.update(id, data);
  }

  @handlerError
  async login (email: string, contraseña : string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    const contraseñaMatch = await compare(contraseña, user!.contraseña as string);
    if (!contraseñaMatch) {
      throw new Error('Invalid password');
    }

    return await new SignJWT({ id: user!.id, nombre_apellido: user!.nombre_apellido, rol: user!.rol })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('4h')
          .sign(publicKey);
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

  async update(id: number, data: Usuario): Promise<Usuario> {
    try {
      const user = await this.userRepository.update(id, data);
      return user;
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error('User not updated');
      }
    }
  }
}