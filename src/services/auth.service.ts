import { singPayload } from "../utils/jwt.js";
import type { CreateUser } from "../interfaces/create-user.interface.js";
import type { IUser } from "../interfaces/user.interface.js";
import { userModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';

export class AuthService {

  async register(data: CreateUser): Promise<{ user: IUser; token: string }> {
    const { password, ...userData } = data;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ ...userData, password: hashedPassword});

    await newUser.save();

    const token = singPayload({ id: newUser._id });

    return { user: newUser, token };
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string } | null> {

    const user = await userModel.findOne({ email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const token = singPayload({ id: user._id });

    return { user, token };
  }
}