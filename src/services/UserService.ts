import { Usuario } from 'db';
import { SignJWT } from 'jose';
import { validateService } from '../decorators/errors/errors.js';
import { getPrivateKey } from '../utils/auth/KeyGen.js';
import { compare } from 'bcrypt-ts';
import { IUserService } from './interfaces/IUserService.js';
import Service from './Service.js';
import { PaginationParams, PaginationResults } from '../types/pagination.types.js';
import { type GetUserForRolDTO, user_mapper } from '../types/DTOs/UsuariosDTO.js';
import IUserRepository from '../repositories/interfaces/IUserRepository.js';
import { toUser } from '../utils/mapper/ForUserRol.js';


export class UserService extends Service<Usuario> implements IUserService {
    constructor(private readonly userRepository: IUserRepository) {
        super(userRepository, 'Usuario');
    }

    @validateService('not deactivated: ')
    async bajaUsuario(id: number, data: Usuario): Promise<void> {
        data.activo = false;
        await this.userRepository.update(id, data);
    }
        
    async findById(id: number): Promise<GetUserForRolDTO> {
        const user = await this.userRepository.findById(id) as Usuario;
        return await toUser<GetUserForRolDTO, Usuario, typeof user_mapper>(user, user_mapper).then(users => users[0]);
    }

    async findByName(name: string): Promise<GetUserForRolDTO[]> {
        const users = await this.userRepository.findByName(name) as Usuario[];
        return await toUser<GetUserForRolDTO, Usuario, typeof user_mapper>(users, user_mapper);
    }

    @validateService('not found: ')
    async findAllUsers(): Promise<GetUserForRolDTO[]> {
        
        const users: Usuario[] = await this.userRepository.findAll() as Usuario[];
        
        return await toUser<GetUserForRolDTO, Usuario, typeof user_mapper>(users, user_mapper);
    }

    @validateService('not Logged: ')
    async login(email: string, contrasenia: string): Promise<string> {
        const private_key = await getPrivateKey();
        const user = await this.userRepository.getPasswordByEmail(email);
        const contraseñaMatch = await compare(contrasenia, user.contrasenia as string);
        if (!contraseñaMatch) {
            throw new Error('Invalid password');
        }
        return await new SignJWT({ id: user.id, rol: user.rol })
            .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('4h')
            .sign(private_key!);
        
        
    }

    @validateService('not created: ')
    async register(data: Usuario): Promise<void> {
        await this.userRepository.create(data);
    }

    @validateService('not found: ')
    async getPagination(params: PaginationParams): Promise<PaginationResults<GetUserForRolDTO>> {
        const result = await this.userRepository.getPagination(params);
        return {
            ...result,
            data: await toUser<GetUserForRolDTO, Usuario, typeof user_mapper>(result.data, user_mapper)
        }
    }
}
