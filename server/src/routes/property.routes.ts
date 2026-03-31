import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(PropertyController.getAllProperties));
router.get('/:propertyId', asyncHandler(PropertyController.getPropertyById));

export default router;