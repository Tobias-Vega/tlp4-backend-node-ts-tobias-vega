import type { Response, NextFunction } from "express"
import type { AuthRequest } from "./interfaces/auth-request.interface.js";

export const permission = (roles: string[]) => {

  return (req: AuthRequest, res: Response, next: NextFunction) => {

    const user = req.user;

    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    if (!roles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });

    next();
  }
}