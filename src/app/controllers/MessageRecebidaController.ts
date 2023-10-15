import { Request, Response, Router } from 'express';
import { IMessageRecebida } from '../interfaces/IMessageRecebida';

import MessageRecebidaRepository from '../repositories/MessageRecebidaRepository';

const messageRecebidaRouter = Router();
// RETORNA TODOS OS MESSAGE QUE O BOT RECEBEU ENVIADAS PELO USUARIOS PELO BOT
messageRecebidaRouter.get(
  '/messageRecebida',
  async (_req: Request, res: Response): Promise<Response> => {
    const users = await MessageRecebidaRepository.getMessage();
    return res.status(200).json(users);
  }
);

//CADASTRA UM NOVO MESSAGE RECEBIDA PELO BOT

export const createMessage = async (message: IMessageRecebida) => {
  try {
    const newMessage =
      await MessageRecebidaRepository.messageRecebidaRepository.save(message);

    return {
      status: 'success',
      message: 'Mensagem criada com sucesso',
      data: newMessage,
    };
  } catch (error) {
    return { status: 'error', message: 'Erro interno do servidor' };
  }
};

export default messageRecebidaRouter;
