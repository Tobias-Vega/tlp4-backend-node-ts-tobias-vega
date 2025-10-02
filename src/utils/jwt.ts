import jwt from 'jsonwebtoken';

export const singPayload = (payload: Object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!!, { expiresIn: '1d' });
}

export const verrifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!!);
  } catch (error) {
    return null;
  }
}