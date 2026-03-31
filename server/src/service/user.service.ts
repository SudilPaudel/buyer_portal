import { AppDataSource } from '../config/pg_db.config';
import { User } from '../entities/User/User.entity';
import { AppError } from '../utils/AppError';

const userRepo = AppDataSource.getRepository(User);

export class UserService {
  static async getMe(userId: string) {
    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}