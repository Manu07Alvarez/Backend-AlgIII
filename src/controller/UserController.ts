import { Usuario } from './../../generated/prisma/index.d';
import { Request, Response } from 'express';
import { IUserService } from '../services/UserService.Interface';
export class UserController {
  
  constructor(
    public readonly userService: IUserService,
  ) {}
  
  
  async login(req: Request, res: Response) {
    try {
      const { email, contraseña } = req.body;
      await this.userService.login(email, contraseña);
      res.status(200).json({ message: 'Login successful' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }
 
  async register(req: Request, res: Response) {
    try {
      const user = {
        email: req.body.email,
        nombre_apellido: req.body.nombre_apellido,
        contraseña: req.body.contraseña,
      } as Usuario;
      await this.userService.register(user);
      res.status(201).json({ message: 'User created successfully' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }
   
  async getUser(req: Request, res: Response) {
    try {
     res.status(200).json(this.userService.getUser(Number(req.params.id)))
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err});
      }
    }
  }
}  