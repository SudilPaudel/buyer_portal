import { Router } from 'express';
import { FavouriteController } from '../controllers/favourite.controller';
import { protect } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', protect, asyncHandler(FavouriteController.getMyFavourites));
router.post('/', protect, asyncHandler(FavouriteController.addFavourite));
router.delete('/:propertyId', protect, asyncHandler(FavouriteController.removeFavourite));

export default router;