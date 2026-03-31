import { Request, Response } from 'express';
import { UserService } from '../service/user.service';

export class UserController {
  static async getMe(req: Request, res: Response) {
    const userId = req.user!.id;
    const user = await UserService.getMe(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  }
}