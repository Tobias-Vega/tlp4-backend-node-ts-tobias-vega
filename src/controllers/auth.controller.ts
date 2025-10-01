import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";


const userService = new AuthService();

export class UserController {

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}