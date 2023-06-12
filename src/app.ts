import { Telegraf } from 'telegraf';
import { Command } from './commands/telegram/command.class';
import { StartCommand } from './commands/telegram/start.command';
import { VKService } from './commands/vk/commands';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';
import { IBotContext } from './context/context.interface';

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  constructor(private readonly configService: IConfigService, private readonly vkService: VKService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'));
    this.vkService = new VKService(this.configService);
    // this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
  }

  async init() {
    this.commands = [new StartCommand(this.bot, this.vkService)];

    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
    console.log('bot started');
  }
}

const bot = new Bot(new ConfigService(), new VKService(new ConfigService()));
bot.init();
