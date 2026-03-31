import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from '../config/pg_db.config';
import { Property } from '../entities/Property/Property.entity';

dotenv.config();

const seedProperties = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected for seeding');

    const propertyRepo = AppDataSource.getRepository(Property);

    const existingCount = await propertyRepo.count();

    if (existingCount > 0) {
      console.log('Properties already exist. Skipping seed.');
      await AppDataSource.destroy();
      process.exit(0);
    }

    const properties = propertyRepo.create([
      {
        title: 'Modern Apartment in Kathmandu',
        location: 'Kathmandu',
        price: 25000000,
      },
      {
        title: 'Luxury Villa in Lalitpur',
        location: 'Lalitpur',
        price: 45000000,
      },
      {
        title: 'Cozy Family House in Bhaktapur',
        location: 'Bhaktapur',
        price: 18000000,
      },
      {
        title: 'Commercial Space in Pokhara',
        location: 'Pokhara',
        price: 32000000,
      },
      {
        title: 'Budget Flat in Butwal',
        location: 'Butwal',
        price: 9500000,
      },
    ]);

    const saved = await propertyRepo.save(properties);
console.log('Saved properties:', saved);

const allProperties = await propertyRepo.find();
console.log('All properties from DB:', allProperties);

    console.log('Properties seeded successfully');
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(1);
  }
};

seedProperties();