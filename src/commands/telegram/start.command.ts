import { Telegraf } from 'telegraf';
import { DODZO_OWNER_ID, DODZO_TEXT_SEARCH_INCLUDES } from '../../constants/dodzo';
import { IBotContext } from '../../context/context.interface';
import { convertToMediaGroup } from '../../helpers/telegram/convertToMediaGroup';
import { VKService } from '../vk/commands';
import { Command } from './command.class';

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>, vkService: VKService) {
    super(bot, vkService);
  }

  async handle(): Promise<void> {
    this.bot.command('food', async (ctx) => {
      const photos = await this.vkService.getAttachments(DODZO_OWNER_ID, DODZO_TEXT_SEARCH_INCLUDES);
      await ctx.sendMediaGroup(convertToMediaGroup(photos));

      ctx.sendPoll(
        '🍽️ Что едим?',
        [
          '🍜 Додзо',
          '🍕 Пиццу',
          '🍣 Суши',
          '🏫 Технолог',
          '🥡 Дошик',
          '🌯 Шаурму',
          '🍷 Сидрерию',
          '🍔 Бургерс',
          '🥄 Другое',
          '👀 Peek',
        ],
        {
          allows_multiple_answers: true,
          is_anonymous: false,
        },
      );
    });
  }
}
