import { User } from '../entities/User';
import { IUser } from '../interfaces/IUser';
import { AppDataSource } from '../../database/data-source';
import bcrypt from 'bcrypt';

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (): Promise<IUser[]> => {
  return await userRepository.find();
};

const getUserByName = async (userName: string): Promise<IUser | null> => {
  const user = await userRepository.findOneBy({ name: userName });
  return user || null;
};

const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ['messages'],
  });

  return user || null;
};

const createUser = async (user: IUser): Promise<IUser> => {
  if (user.password) {
    const hasPassword = await bcrypt.hash(user.password, 8);
    user.password = hasPassword;
  }

  const newUser = await userRepository.save(user);
  const { password, ...userWithoutPassword } = newUser;

  return newUser;
};

export const updateUser = async (
  name: string,
  chatId?: string,
  userId?: string
) => {
  let newUser;
  if (userId) {
    const userExists = await getUserById(userId);
    if (userExists) {
      newUser = await userRepository.update({ id: userId }, { name });
      return newUser;
    } else {
      throw new Error('Usuário não encontrado');
    }
  } else {
    const userExists = await getUserByName(name);
    if (userExists) {
      if (!userExists.chatId) {
        newUser = await userRepository.update({ name: name }, { name, chatId });
        return newUser;
      } else {
        throw new Error('Usuário ja cadastrado com chatId');
      }
    } else {
      throw new Error('Usuário não encontrado');
    }
  }
};

export default { getUsers, getUserByName, getUserById, createUser };
