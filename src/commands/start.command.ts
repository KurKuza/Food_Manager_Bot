import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Command } from './command.class';

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.sendPoll(
        '🍽️ Что едим?',
        ['🍜 Додзо', '🍕 Пицца', '🍣 Суши', '🏫 Технолог', '🥡 Дошик', '🌯 Шаурма', '🍷 Сидрерия', '🍔', '🥄 Другое'],
        {
          allows_multiple_answers: true,
          is_anonymous: false,
        },
      );
    });
  }
}