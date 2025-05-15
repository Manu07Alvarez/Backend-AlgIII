
import { Request, Response } from 'express';
import { UserRepository as User } from '../repositories/UserRepository';
class UserController {
  
  constructor(
    private readonly userRepository: User
  ) {}

  
  login(req: Request, res: Response) {

  }
}