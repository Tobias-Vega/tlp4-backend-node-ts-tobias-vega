import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';   
import { userModel } from '../models/user.model.js';


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!!) as { userId: string };

    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}