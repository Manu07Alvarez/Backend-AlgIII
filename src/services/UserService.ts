import { Usuario } from 'db';
import { UserRepository } from '../repositories/UserRepository.js';
import { SignJWT } from 'jose';
import { validateService } from '../decorators/errors/errors.js';
import { getPublicKey } from '../utils/auth/KeyGen.js';
import { compare } from 'bcrypt-ts';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';

const publicKey = await getPublicKey();

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @validateService('not deactivated: ')
  async bajaUsuario(id: number, data: Usuario): Promise<void> {
    data.activo = false;
    await this.userRepository.update(id, data);
  }

  @validateService('not Logged: ')
  async login(email: string, contraseña: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    const contraseñaMatch = await compare(contraseña, user.contraseña as string);

    if (!contraseñaMatch) throw new Error('Invalid password');

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

  async getPagination(params: PaginationParams): Promise<PaginationResults<Usuario>> {
    // Se delega a UserRepository, que ya devuelve el tipo correcto
    return this.userRepository.getPagination(params) as unknown as PaginationResults<Usuario>;
  }
}
