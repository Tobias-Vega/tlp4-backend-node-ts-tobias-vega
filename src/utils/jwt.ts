import jwt from 'jsonwebtoken';

export const singToken = (payload: Object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!!, { expiresIn: '1d' });
}

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}