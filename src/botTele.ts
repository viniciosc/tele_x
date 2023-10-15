import TelegramBot from 'node-telegram-bot-api';
import { createMessage } from './app/controllers/MessageRecebidaController';
import { updateUser } from './app/repositories/UserRepository';

if (!process.env.BOT_TOKEN) throw new Error('Sem token bot');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.on('message', async (msg) => {
  if (msg.from?.first_name && msg.text && msg.chat.id) {
    const newMessage = {
      name: msg.from?.first_name,
      message: msg.text,
      chatId: msg.chat.id.toString(),
    };
    const message = await createMessage(newMessage);
    if (message.data?.name && message.data?.chatId) {
      try {
        const newUser = await updateUser(
          message.data?.name!,
          message.data?.chatId,
          ''
        );
        return { message: 'Sucesso!' };
      } catch (error: any) {
        return { message: error.message };
      }
    }
  }
});
export default bot;
