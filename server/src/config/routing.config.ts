import express from 'express';
import authRoutes from '../routes/auth.routes';
import userRoutes from '../routes/user.routes';
import favouriteRoutes from '../routes/favourite.routes';

const mainRouter = express.Router();

mainRouter.use('/auth', authRoutes);
mainRouter.use('/users', userRoutes);
mainRouter.use('/favourites', favouriteRoutes);

export default mainRouter;