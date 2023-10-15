import { Response, Request, Router } from 'express';
import TelegramBot from 'node-telegram-bot-api';

import { Message } from '../entities/Message';
import { IMessage } from '../interfaces/IMessage';
import { authMiddleware } from '../middlewares/authMiddleware';
import MessageRepository from '../repositories/MessageRepository';

const messageRouter = Router();
//RETORNAR TODAS AS MENSAGENS ENVIADAS DO USUARIO QUE ESTA LOGADO
messageRouter.get(
  '/messages/:userId',
  authMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.userId;
    const messages = await MessageRepository.getMessage(userId);

    return res.status(200).json(messages);
  }
);

//ENVIAR UMA MENSAGEM PARA O BOT
messageRouter.post(
  '/messages/:userId',
  authMiddleware,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const newMessage = await MessageRepository.createMessage(
        req.body,
        req.params.userId
      );

      return res.status(201).json(newMessage);
    } catch (error: any) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default messageRouter;
