import { Telegraf } from 'telegraf';
import { IBotContext } from '../../context/context.interface';
import { Command } from './command.class';
import { VKService } from '../vk/commands';
import { DODZO_OWNER_ID, DODZO_TEXT_SEARCH_INCLUDES } from '../../constants/dodzo';
import { convertToMediaGroup } from '../../helpers/telegram/convertToMediaGroup';

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>, vkService: VKService) {
    super(bot, vkService);
  }

  async handle(): Promise<void> {
    const photos = await this.vkService.getAttachments(DODZO_OWNER_ID, DODZO_TEXT_SEARCH_INCLUDES);

    this.bot.command('food', async (ctx) => {
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
