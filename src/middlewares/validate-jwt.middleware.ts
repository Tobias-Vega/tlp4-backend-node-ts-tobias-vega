import type { Request, Response, NextFunction } from 'express';   
import { verifyToken } from '../utils/jwt.js';

export interface AuthRequest extends Request {
  user?: any;
}

export const validateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = verifyToken(token, process.env.JWT_SECRET!!);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}