import jwt, { type SignOptions } from "jsonwebtoken";
import envs from "../config/envs.config.js";
import type { JtwPayload } from "./jwt-payload.js";


export class JwtService {
  private static readonly SECRET_KEY = envs.JWT_SECRET;
  private static readonly EXPIRES_IN = envs.JWT_EXPIRES_IN;

  public static signToken(payload: JtwPayload): string {

    if (!this.SECRET_KEY) {
      throw new Error('Secret key not defined');
    }

    return jwt.sign(payload, this.SECRET_KEY, { expiresIn: this.EXPIRES_IN } as SignOptions);
  }

  public static verifyToken(token: string): JtwPayload {
    if (!this.SECRET_KEY) {
      throw new Error('Secret key not defined');
    }

    try {
      const decoded = jwt.verify(token, this.SECRET_KEY) as JtwPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}