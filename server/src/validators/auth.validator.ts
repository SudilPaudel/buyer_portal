import { AppError } from '../utils/AppError';

export const validateRegisterInput = (body: any) => {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw new AppError('Name, email and password are required', 400);
  }

  if (password.length < 6) {
    throw new AppError('Password must be at least 6 characters', 400);
  }
};

export const validateLoginInput = (body: any) => {
  const { email, password } = body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }
};