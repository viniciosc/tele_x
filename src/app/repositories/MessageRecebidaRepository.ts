import { AppDataSource } from '../../database/data-source';
import { MessageRecebida } from '../entities/MessageRecebida';
import { IMessageRecebida } from '../interfaces/IMessageRecebida';

const messageRecebidaRepository = AppDataSource.getRepository(MessageRecebida);

const getMessage = async (): Promise<IMessageRecebida[] | {}> => {
  const mensages = await messageRecebidaRepository.find();

  if (mensages) {
    return mensages;
  }

  return {};
};

export default { getMessage, messageRecebidaRepository };
