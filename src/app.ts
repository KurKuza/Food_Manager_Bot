import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { Command } from './commands/telegram/command.class';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';
import { IBotContext } from './context/context.interface';
import { StartCommand } from './commands/telegram/start.command';
import { VK } from 'vk-io';
import { WallGetResponse } from 'vk-io/lib/api/schemas/responses';
import { WallWallpostFull } from 'vk-io/lib/api/schemas/objects';

class Bot {
  bot: Telegraf<IBotContext>;
  vk: VK;
  commands: Command[] = [];
  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'));
    this.vk = new VK({ token: this.configService.get('VK_TOKEN') });
    // this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
  }

  async init() {
    this.commands = [new StartCommand(this.bot)];

    const dodzoWall: WallGetResponse = await this.vk.api.wall.get({ count: 10, owner_id: -198384075 });
    const targetPostsDodzo = dodzoWall.items.find((item: WallWallpostFull) => item.text?.includes('Меню бизнес-ланча'));
    const targetAttachments = targetPostsDodzo?.attachments;

    const photoIds = [];

    for (const attachment of targetAttachments || [{ photo: { id: 0 } }]) {
      photoIds.push(attachment?.photo.id.toString());
    }

    console.log('🚀  photos:', photoIds);

    const photoUrls = await this.vk.api.photos.get({ photo_ids: photoIds, album_id: '-198384075' });
    console.log('🚀  photoUrls:', photoUrls);

    // targetPostsDodzo?.attachments?.forEach((attachment) => {
    //   console.log(attachment);
    // });

    // this.vk.api.photos.get({ owner_id: -198384075, photo_ids: targetPostDodzo.attachments });
    // console.log(targetPostsDodzo)

    for (const command of this.commands) {
      command.handle();
    }

    this.bot.launch();
    console.log('bot started');
  }
}

const bot = new Bot(new ConfigService());
bot.init();
