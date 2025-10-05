import bcrypt from 'bcrypt';
import type { CreateUser } from "../interfaces/create-user.interface.js";
import type { IUser } from "../interfaces/user.interface.js";
import { userModel } from "../models/user.model.js";
import { JwtService } from "../../../utils/jwt.js";

export class AuthService {

  async register(data: CreateUser): Promise<{ user: IUser; token: string }> {
    const userExists = await userModel.findOne({ email: data.email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const { password, ...userData } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ ...userData, password: hashedPassword });
    await newUser.save();

    const token = JwtService.signToken({ id: newUser._id, email: newUser.email, role: newUser.role });
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

    const token = JwtService.signToken({ id: user._id, email: user.email, role: user.role });
    return { user, token };
  }
}