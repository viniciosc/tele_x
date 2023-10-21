import { Request, Response, Router } from 'express';
import { User } from '../entities/User';
import { IUser } from '../interfaces/IUser';
import UserRepository from '../repositories/UserRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authMiddleware } from '../middlewares/authMiddleware';

const loginRouter = Router();

loginRouter.post(
  '/login',
  async (req: Request, res: Response): Promise<Response> => {
    const { name, password } = req.body;

    if (!name && !password) {
      return res.status(400).json({ message: 'Usuário ou senha inválidos!' });
    }

    const user = await UserRepository.getUserByName(name);

    if (!user)
      return res.status(400).json({ message: 'Usuário ou senha inválidos!' });

    const verifyPass = await bcrypt.compare(password, user.password!);

    if (!verifyPass)
      return res.status(400).json({ message: 'Usuário ou senha inválidos!' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS!, {
      expiresIn: '8h',
    });

    const { password: _, ...userLogin } = user;
    return res.json({
      user: userLogin,
      token: token,
    });
  }
);

loginRouter.get(
  '/profile',
  authMiddleware,
  async (req: Request, res: Response) => {
    return res.json(req.user);
  }
);

export default loginRouter;
