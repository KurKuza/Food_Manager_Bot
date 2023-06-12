import { Telegraf } from 'telegraf';
import { IBotContext } from '../../context/context.interface';
import { VKService } from '../vk/commands';

export abstract class Command {
  constructor(public bot: Telegraf<IBotContext>, public vkService: VKService) {}

  abstract handle(): void;
}
