import type { IUser } from "../interfaces/user.interface.js";
import { userModel } from "../models/user.model.js";

export class AuthService {

  async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new userModel(data);
    return await user.save();
  }
}