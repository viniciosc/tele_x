import { IMessage } from './IMessage';

export interface IUser {
  id?: string;
  name: string;
  nameTelegram?: string | null;
  password?: string;
  chatId?: string;
  messages?: IMessage[];
  createdAt?: Date;
  updatedAt?: Date;
}
