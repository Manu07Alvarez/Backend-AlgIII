import { Request, Response } from 'express';

class LoginController {
  constructor() {
  }
  checkLogin(req: Request, res: Response) {
    const {email, password } = req.body;
    res.status(200).json({ message: 'Login successful' });
    res.status(401).json({ message: 'Invalid credentials' });
  }
}