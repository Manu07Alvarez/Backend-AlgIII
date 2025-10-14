import { Usuario } from '../generated/prisma/client.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { SignJWT } from 'jose';
import { validateService } from '../decorators/errors/errors.js';
import { getPublicKey } from '../utils/auth/KeyGen.js';
import { compare } from 'bcrypt-ts';
import { IUserService } from './interfaces/IUserService.js';
import Service from './Service.js';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';

const publicKey = await getPublicKey();

export class UserService extends Service<Usuario> implements IUserService {
    constructor(private readonly userRepository: UserRepository) {
        super(userRepository, 'Usuario');
    }

    @validateService('not deactivated: ')
    async bajaUsuario(id: number, data: Usuario): Promise<void> {
        data.activo = false;
        await this.userRepository.update(id, data);
    }

    @validateService('not Logged: ')
    async login(email: string, contraseña: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        const contraseñaMatch = await compare(contraseña, user.contrasenia as string);
        if (!contraseñaMatch) {
            throw new Error('Invalid password');
        }

        return await new SignJWT({ id: user.id, rol: user.rol })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('4h')
            .sign(publicKey!);
    }

    @validateService('not created: ')
    async register(data: Usuario): Promise<void> {
        await this.userRepository.create(data);
    }

    async getPagination(params: PaginationParams): Promise<PaginationResults<Usuario>> {
        const result = await this.userRepository.getPagination(params);

        if (!result || !Array.isArray(result.data)) {
            throw new Error('Formato de resultado inválido');
        }

        return result;
    }
}
