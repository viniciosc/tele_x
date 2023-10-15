import { IUser } from './IUser';

export interface IMessage {
  id?: string;
  message: string;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
