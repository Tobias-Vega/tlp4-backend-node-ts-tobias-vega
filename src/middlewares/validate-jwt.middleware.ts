import type { Request, Response, NextFunction } from 'express';   
import { JwtService } from '../utils/jwt.js';
import type { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const validateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = JwtService.verifyToken(token);

    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}