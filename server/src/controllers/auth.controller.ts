import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { validateLoginInput, validateRegisterInput } from '../validators/auth.validator';

export class AuthController {
  static async register(req: Request, res: Response) {
    validateRegisterInput(req.body);

    const { name, email, password } = req.body;
    const data = await AuthService.register(name, email, password);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data,
    });
  }

  static async login(req: Request, res: Response) {
    validateLoginInput(req.body);

    const { email, password } = req.body;
    const data = await AuthService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data,
    });
  }
}