import jwt from 'jsonwebtoken';

export const generateToken = (payload: { id: string; email: string; role: string }) => {
  const secret: jwt.Secret = process.env.JWT_SECRET || '';

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  } as jwt.SignOptions);
};