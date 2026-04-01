/// <reference path="../types/express.d.ts" />
import { Request, Response } from 'express';
import { FavouriteService } from '../service/favourite.service';
import { validateFavouriteInput } from '../validators/favourite.validator';

export class FavouriteController {
  static async getMyFavourites(req: Request, res: Response) {
    const userId = req.user!.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const result = await FavouriteService.getMyFavourites(userId, page, limit);

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  }

  static async addFavourite(req: Request, res: Response) {
    validateFavouriteInput(req.body);

    const userId = req.user!.id;
    const { propertyId } = req.body;

    const favourite = await FavouriteService.addFavourite(userId, propertyId);

    res.status(201).json({
      success: true,
      message: 'Property added to favourites',
      data: favourite,
    });
  }

  static async removeFavourite(req: Request, res: Response) {
    const userId = req.user!.id;
    const { propertyId } = req.params as { propertyId: string };

    const result = await FavouriteService.removeFavourite(userId, propertyId);

    res.status(200).json({
      success: true,
      ...result,
    });
  }
}