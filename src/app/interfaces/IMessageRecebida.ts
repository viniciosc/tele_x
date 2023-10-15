export interface IMessageRecebida {
  id?: string;
  name: string;
  message: string;
  chatId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
