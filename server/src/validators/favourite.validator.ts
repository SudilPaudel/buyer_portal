import { AppError } from '../utils/AppError';

export const validateFavouriteInput = (body: any) => {
  const { propertyId } = body;

  if (!propertyId) {
    throw new AppError('propertyId is required', 400);
  }
};