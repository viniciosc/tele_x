import { Request, Response, Router } from 'express';
import { User } from '../entities/User';
import { IUser } from '../interfaces/IUser';
import { authMiddleware } from '../middlewares/authMiddleware';
import UserRepository, { updateUser } from '../repositories/UserRepository';

const userRouter = Router();
//RETORNA TODOS OS USUARIOS QUE ESTAO CONECTADOS COM O BOT
userRouter.get(
  '/users',
  authMiddleware,
  async (_req: Request, res: Response): Promise<Response> => {
    const users = await UserRepository.getUsers();
    return res.status(200).json(users);
  }
);

//CADASTRA UM NOVO USUARIO
userRouter.post(
  '/users',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, password } = req.body;

      const userExists = await UserRepository.getUserByName(name);

      if (!name) return res.status(400).json({ message: 'Nome obrigatório!' });

      if (!password)
        return res.status(400).json({ message: 'Senha obrigatória!' });

      if (userExists)
        return res.status(400).json({ message: 'Usuário já cadastrado!' });

      const newUser = await UserRepository.createUser(req.body);

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

userRouter.patch(
  '/users/:userId',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name } = req.body;
      const userId = req.params.userId;
      const newUser = await updateUser(name, '', userId);

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default userRouter;
