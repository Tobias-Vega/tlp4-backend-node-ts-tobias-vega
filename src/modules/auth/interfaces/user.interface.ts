export type Role = 'admin' | 'user';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
}