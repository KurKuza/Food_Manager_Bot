import { Telegraf } from 'telegraf';
import { VK } from 'vk-io';
import { WallWallpostAttachment, WallWallpostFull } from 'vk-io/lib/api/schemas/objects';
import { PhotosGetResponse, WallGetResponse } from 'vk-io/lib/api/schemas/responses';
import { Command } from './commands/telegram/command.class';
import { StartCommand } from './commands/telegram/start.command';
import { IConfigService } from './config/config.interface';
import { ConfigService } from './config/config.service';
import { IBotContext } from './context/context.interface';

class Bot {
  bot: Telegraf<IBotContext>;
  vk: VK;
  commands: Command[] = [];
  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'));
    this.vk = new VK({ token: this.configService.get('VK_TOKEN') });
    // this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
  }
  // import axios from 'axios';

  // const access_token = 'your_access_token';
  // const owner_id = 'owner_id';
  // const count = 10;
  // const today = new Date();
  // const unixtime = Math.floor(today.getTime() / 1000);

  // const url = `https://api.vk.com/method/wall.get?owner_id=${owner_id}&count=${count}&filter=owner&start_time=${unixtime}&access_token=${access_token}&v=5.131`;

  // axios.get(url)
  //   .then(response => {
  //     console.log(response.data.response.items);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  async init() {
    this.commands = [new StartCommand(this.bot)];

    const dodzoWall: WallGetResponse = await this.vk.api.wall.get({ count: 10, owner_id: -198384075 });
    console.log('🚀  dodzoWall:', dodzoWall);
    const targetPostsDodzo = dodzoWall.items.find((item: WallWallpostFull) => item.text.includes('Меню бизнес-ланча'));
    const targetAttachments = targetPostsDodzo.attachments;

    for (const post of dodzoWall.items) {
      // console.log('🚀  attachment.photo:', attachment.photo.sizes);
      post.date;
      console.log('🚀  post.date:', post.date);
      const dateNow = new Date();

      console.log('🚀  new Date(post.date):', new Date(post.date - Number(dateNow)).getDay());
      new Date(post.date || '');
    }

    const photoIds = [];
    let count = 0;
    for (const attachment of targetAttachments) {
      console.log('count', (count += 1));
      // console.log('🚀  attachment.photo:', attachment.photo.sizes);
      photoIds.push(attachment.photo);
    }

    // console.log('🚀  photoIds:', photoIds);

    // targetPostsDodzo.attachments.forEach((attachment) => {
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
