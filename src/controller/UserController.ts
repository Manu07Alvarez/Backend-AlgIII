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
      const jwt = await this.userService.login(email, contraseña);
      res.cookie('token', jwt)
      res.status(200).json({ message: 'Login successful' })
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
      await this.userService.getUser(Number(req.params.id));
      res.status(200).json()
      
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err});
      }
    }
  }
  async update(req: Request, res: Response) {
    try {
      const user = {
        email: req.body.email,
        nombre_apellido: req.body.nombre_apellido, //Debe ser alias o user name
        contraseña: req.body.contraseña, //Se debe cifrar
        // Carrera, estado (cursando o no) 
      } as Usuario;
      await this.userService.update(Number(req.params.id), user);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }
}  
