import { Usuario } from 'db';
import { UserRepository } from '../repositories/UserRepository.js';
import { SignJWT } from 'jose';
import { validateService } from '../decorators/errors/errors.js';
import { getPublicKey } from '../utils/auth/KeyGen.js';
import { compare } from 'bcrypt-ts';
import { IUserService } from './interfaces/IUserService.js';
import Service from './Service.js';
import { PaginationParams, PaginationResults } from 'types/pagination.types.js';
import { getAuth } from 'utils/context/AuthUserContext.js';
import { type GetUserForAdminDTO, type GetUserForUserDTO, type GetUserForRolDTO, user_mapper } from 'types/DTOs/UsuariosDTO.js';

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

    @validateService('not found: ')
    async findAllUsers(): Promise<GetUserForRolDTO[]> {
        const {user} = getAuth();
        const users: Usuario[] = await this.userRepository.findAll() as Usuario[];
        if (!user?.rol) return users.map(user_mapper.USER);
        const mapper = user_mapper[user.rol as keyof typeof user_mapper];
        if (!mapper) throw new Error('Unauthorized');
        return users.map(mapper);
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

    @validateService('not found: ')
    async getPagination(params: PaginationParams): Promise<PaginationResults<GetUserForRolDTO>> {
        const {user} = getAuth();
        const result = await this.userRepository.getPagination(params);
        if (!user?.rol) result.data = result.data.map(user_mapper.USER);
        const mapper = user_mapper[user!.rol as keyof typeof user_mapper];
        if (!mapper) throw new Error('Unauthorized');
        result.data = result.data.map(mapper);
        if (!result || !Array.isArray(result.data)) {
            throw new Error('Formato de resultado inválido');
        }

        return result;
    }
}
