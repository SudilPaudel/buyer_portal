import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/pg_db.config';
import { User } from '../entities/User/User.entity';
import { AppError } from '../utils/AppError';
import { generateToken } from '../utils/jwt';

const userRepo = AppDataSource.getRepository(User);

export class AuthService {
  static async register(name: string, email: string, password: string) {
    const existingUser = await userRepo.findOne({ where: { email } });

    if (existingUser) {
      throw new AppError('User already exists with this email', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({
      name,
      email,
      password: hashedPassword,
      role: 'buyer',
    });

    await userRepo.save(user);

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async login(email: string, password: string) {
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}