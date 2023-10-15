import { Message } from '../entities/Message';
import { User } from '../entities/User';
import { IMessage } from '../interfaces/IMessage';
import { IUser } from '../interfaces/IUser';
import { AppDataSource } from '../../database/data-source';
import bot from '../../botTele';
import { IsNull, Not } from 'typeorm';

const userRepository = AppDataSource.getRepository(User);
const messageRepository = AppDataSource.getRepository(Message);

const getMessage = async (userId: string): Promise<IUser | {}> => {
  const userMensages = await userRepository.find({
    where: { id: userId },
    relations: ['messages'],
  });

  if (userMensages) {
    return userMensages;
  }

  return {};
};

const createMessage = async (
  messages: IMessage,
  userId: string
): Promise<IMessage> => {
  const user = await userRepository.findOneBy({ id: userId });
  const users: IUser[] = await userRepository.find({
    where: {
      chatId: Not(IsNull()),
    },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const { message } = messages;

  const newMessage = messageRepository.create({
    message,
    user,
  });

  await messageRepository.save(newMessage);

  users.forEach((user) => {
    if (user.chatId) bot.sendMessage(user.chatId, message);
  });

  return newMessage;
};

export default { getMessage, createMessage };
