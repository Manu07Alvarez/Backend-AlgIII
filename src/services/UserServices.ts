import { UserRepository as User } from '../repositories/UserRepository';
import { Usuario } from '../../generated/prisma/client';

class UserService { 

  constructor(
    private readonly userRepository: User
  ) {}

  async signUp(data: Usuario): Promise<boolean> {
    const user =  await this.userRepository.create(data);
    if (!user) {
      throw new Error('User not created');
    }
    return true;
  }
 
  async login(data: Usuario): Promise<boolean>{
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('User not found');
    }
    return true;  
  }
}
