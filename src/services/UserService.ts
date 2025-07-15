import { UserRepository } from '../repositories/UserRepository.ts';
import { Usuario } from '../../generated/prisma/client.js';
import { SignJWT } from 'jose';
import { validateService } from '../decorators/errors/errors.ts';
import { getPublicKey } from '../utils/auth/KeyGen.ts';
import { compare } from 'bcrypt-ts';
import { IUserService } from './interfaces/IUserService.ts';
import Service from './Service.ts';
const publicKey = await getPublicKey();
export class UserService extends Service<Usuario> implements IUserService { 

  constructor(
    private readonly userRepository: UserRepository
  ) {super(userRepository, 'Usuario');}

  @validateService('not deactivated: ')
  async bajaUsuario(id: number, data: Usuario): Promise<void> {
    data.activo = false;
    await this.userRepository.update(id, data);
  }

  @validateService('not Logged: ')
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


  @validateService('not created: ')
  async register(data: Usuario): Promise<void> {
    await this.userRepository.create(data);
  }
  
}