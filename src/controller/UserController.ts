
import { Request, Response } from 'express';
import { Usuario as User } from '../repositories/UsuarioRepository';
class UserController {
  
  constructor(
    private readonly userRepository: User
  ) {}
  Login(req: Request, res: Response) {
    const {email, password } = req.body;
    res.status(200).json({ message: 'Login successful' });
    res.status(401).json({ message: 'Invalid credentials' });
  }
}