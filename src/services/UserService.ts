import { UserRepository } from '../repositories/UserRepository.ts';
import { Usuario } from '../../generated/prisma/client.js';
import { SignJWT } from 'jose';
import { validateService } from '../decorators/errors/errors.ts';
import { getPublicKey } from '../utils/auth/KeyGen.ts';
import { compare } from 'bcrypt-ts';
import { IUserService } from './IUser.ts';
const publicKey = await getPublicKey();
export class UserService implements IUserService { 

  constructor(
    private readonly userRepository: UserRepository
  ) {}
  async bajaUsuario(id: number, data: Usuario): Promise<void> {
    data.activo = false;
    await this.userRepository.update(id, data);
  }

  @validateService('Login Error: ')
  async login (email: string, contraseña : string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    const contraseñaMatch = await compare(contraseña, user.contraseña as string);
    if (!contraseñaMatch) {
      throw new Error('Invalid password');
    }

    return await new SignJWT({ id: user.id, nombre_apellido: user.nombre_apellido, rol: user.rol })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('4h')
          .sign(publicKey!);
  }

  @validateService('User Not found: ')
  async getUser(id: number): Promise<Partial<Usuario>> {
    return await this.userRepository.findById(id);
  }

  @validateService('User not created: ')
  async register(data: Usuario): Promise<void> {
    await this.userRepository.create(data);
  }

  /**
   * Updates the user data for a given user ID.
   * 
   * @param id - The unique identifier of the user to be updated.
   * @param data - The new data for the user, encapsulated in a Usuario object.
   * @returns A promise that resolves to the updated Usuario object.
   * @throws An error if the user could not be updated.
   */

  async update(id: number, data: Usuario): Promise<void> {
    try {
      await this.userRepository.update(id, data);
    }
    catch (error) {
      if (error instanceof Error) {
        throw new Error('User not updated');
      }
    }
  }
  
}