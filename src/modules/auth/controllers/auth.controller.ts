import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const userService = new AuthService();

export class UserController {
  

  async register(req: Request, res: Response): Promise<Response> {
    try {

      const { name, email, password } = req.body;

      const user = await userService.register({ name, email, password });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const result = await userService.login(email, password);

      if (!result) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      res.cookie('token', result.token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  async logout(req: Request, res: Response): Promise<Response> {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}