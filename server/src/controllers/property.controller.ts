import { Request, Response } from 'express';
import { PropertyService } from '../service/property.service';
import { AppError } from '../utils/AppError';

export class PropertyController {
  static async getAllProperties(_req: Request, res: Response) {
    const properties = await PropertyService.getAllProperties();

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  }

  static async getPropertyById(req: Request, res: Response) {
    const { propertyId } = req.params as { propertyId: string };

    const property = await PropertyService.getPropertyById(propertyId);

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  }
}