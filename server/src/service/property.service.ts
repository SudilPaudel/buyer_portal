import { AppDataSource } from '../config/pg_db.config';
import { Property } from '../entities/Property/Property.entity';

const propertyRepo = AppDataSource.getRepository(Property);

export class PropertyService {
  static async getAllProperties() {
    const properties = await propertyRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return properties;
  }

  static async getPropertyById(propertyId: string) {
    const property = await propertyRepo.findOne({
      where: { id: propertyId },
    });

    return property;
  }
}