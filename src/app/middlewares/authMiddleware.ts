import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import UserRepository from '../repositories/UserRepository';

type JwtPayload = {
  id: string;
};

declare global {
  module Express {
    interface Request {
      user: Partial<User>;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS!) as JwtPayload;

    const user = await UserRepository.getUserById(id);

    if (!user) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { password: _, ...userLogin } = user;

    req.user = userLogin as Partial<User>;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token JWT inválido' });
  }
};
