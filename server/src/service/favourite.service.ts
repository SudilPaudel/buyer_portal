import { AppDataSource } from '../config/pg_db.config';
import { Favourite } from '../entities/Favourite/Favourite.entity';
import { Property } from '../entities/Property/Property.entity';
import { User } from '../entities/User/User.entity';
import { AppError } from '../utils/AppError';

const favouriteRepo = AppDataSource.getRepository(Favourite);
const propertyRepo = AppDataSource.getRepository(Property);
const userRepo = AppDataSource.getRepository(User);

export class FavouriteService {
  static async getMyFavourites(userId: string) {
    const favourites = await favouriteRepo.find({
      where: { user: { id: userId } },
      relations: ['property'],
      order: { createdAt: 'DESC' },
    });

    return favourites.map((fav) => ({
      favouriteId: fav.id,
      property: fav.property,
      addedAt: fav.createdAt,
    }));
  }

  static async addFavourite(userId: string, propertyId: string) {
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new AppError('User not found', 404);

    const property = await propertyRepo.findOne({ where: { id: propertyId } });
    if (!property) throw new AppError('Property not found', 404);

    const existingFavourite = await favouriteRepo.findOne({
      where: {
        user: { id: userId },
        property: { id: propertyId },
      },
      relations: ['user', 'property'],
    });

    if (existingFavourite) {
      throw new AppError('Property already in favourites', 409);
    }

    const favourite = favouriteRepo.create({
      user,
      property,
    });

    await favouriteRepo.save(favourite);

    return favourite;
  }

  static async removeFavourite(userId: string, propertyId: string) {
    const favourite = await favouriteRepo.findOne({
      where: {
        user: { id: userId },
        property: { id: propertyId },
      },
      relations: ['user', 'property'],
    });

    if (!favourite) {
      throw new AppError('Favourite not found', 404);
    }

    await favouriteRepo.remove(favourite);

    return { message: 'Favourite removed successfully' };
  }
}