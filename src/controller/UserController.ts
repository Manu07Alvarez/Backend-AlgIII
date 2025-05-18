import { Usuario } from './../../generated/prisma/index.d';

import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
export class UserController {
  
  constructor(
    public readonly userService: UserService,
  ) {}
  
  login(req: Request, res: Response) {
    try {
      const { email, contraseña } = req.body;
      this.userService.login(email, contraseña);
      res.status(200).json({ message: 'Login successful' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }

  register = (req: Request, res: Response) => {
    try {
      const { nombre_apellido, email, contraseña } = req.body;
      Usuario
      this.userService.register({ nombre_apellido, email, contraseña });
      res.status(201).json({ message: 'User created successfully' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }

  getUser = (req: Request, res: Response) => {
    try {
      this.userService.getUser(Number(req.params.id))
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }
}  