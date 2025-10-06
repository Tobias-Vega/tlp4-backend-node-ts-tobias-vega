import bcrypt from 'bcrypt';
import type { IUser } from "../interfaces/user.interface.js";
import { userModel } from "../models/user.model.js";
import { JwtService } from "../../../utils/jwt.js";
import type { CreateUserDto } from '../dto/create-user.dto.js';
import type { LoginUserDto } from '../dto/login-user.dto.js';

export class AuthService {

  async register(data: CreateUserDto): Promise<{ user: IUser; token: string }> {
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

  async login(data: LoginUserDto): Promise<{ user: IUser; token: string } | null> {
    const user = await userModel.findOne({ email: data.email });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = JwtService.signToken({ id: user._id, email: user.email, role: user.role });
    return { user, token };
  }
}