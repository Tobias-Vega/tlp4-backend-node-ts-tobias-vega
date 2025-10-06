import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class UserController {

  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password } = req.body;

      const user = await this.authService.register({ name, email, password });

      return res.status(201).json(user);
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login({ email, password });

      if (!result) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      res.cookie('token', result.token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })

      return res.status(200).json(result);
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  logout = async (req: Request, res: Response): Promise<Response> => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}