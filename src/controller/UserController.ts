
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
export class UserController {
  
  constructor(
    public readonly userService: UserService,
  ) {}
  
  login(req: Request, res: Response) {
    
  }

  getUser = (req: Request, res: Response) => {
    try {
      this.userService.getById(Number(req.params.id))
    }
    catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }
}  