import { Usuario } from './../generated/prisma/client.js';
import { Request, Response } from 'express';
import { IUserService } from '../services/interfaces/IUserService.js';
import { PaginationParams,PaginationResults } from 'types/pagination.types.js';
export class UserController {
  
  constructor(
    public readonly userService: IUserService,
  ) {}
  

  async findAll(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (err: unknown) {        
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }

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
      const user: Usuario = req.body;
      await this.userService.register(user);
      res.status(201).json({ message: 'User created successfully' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }

  async deactivate(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await this.userService.bajaUsuario(id, req.body.activo);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }
   
  async getUser(req: Request, res: Response) {
    try {
      const user = await this.userService.findById(Number(req.params.id));
      res.status(200).json(user)
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json(error.message);
      }
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user : Usuario = req.body; 

      const updatedUser = await this.userService.update(id, user);
      res.status(200).json(updatedUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(304).json({ message: err.message }); // Error 304 es usuaro no modificado
      } else {
        res.status(500).json({ message: 'Unexpected error' });
      }
    }
  }

/*   public async getPagination(req: Request, res: Response): Promise<void> {
  try {
    const { page, limit } = req.query;

    const paginationParams: PaginationParams = {
      page: Number(page),
      limit: Number(limit),
    };

    const result = await this.userService.getPagination(paginationParams);
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  } */
}
