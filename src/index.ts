import { Telegraf } from 'telegraf';
import { VK } from 'vk-io';
import { WallWallpostFull } from 'vk-io/lib/api/schemas/objects';
import { WallGetResponse } from 'vk-io/lib/api/schemas/responses';
import { DODZO_OWNER_ID, DODZO_TEXT_SEARCH_INCLUDES } from './constants/dodzo';
import { convertToMediaGroup } from './helpers/telegram/convertToMediaGroup';

const vk = new VK({ token: process.env.VK_TOKEN });
const telegram = new Telegraf(process.env.BOT_TOKEN);

const getAttachments = async (ownerId: number, textIncludes: string) => {
  const wall: WallGetResponse = await vk.api.wall.get({ count: 10, owner_id: ownerId });
  const targetPosts = wall.items.find((item: WallWallpostFull) => item.text.includes(textIncludes));
  const targetAttachments = targetPosts.attachments;

  const photoUrls: string[] = [];
  for (const attachment of targetAttachments) {
    for (const size of attachment.photo.sizes) {
      if (size.type === 'w') {
        photoUrls.push(size.url);
      }
    }
  }

  return photoUrls;
};

exports.handler = async function (event: any, context: any) {
  const body = JSON.parse(event.body);

  if (body.message.text === '/food') {
    const msg = {
      method: 'sendPoll',
      chat_id: body.message.chat.id,
      question: '🍽️ Что едим?',
      options: [
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
      is_anonymous: false,
      allows_multiple_answers: true,
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(msg),
      isBase64Encoded: false,
    };
  }

  if (body.message.text === '/menu') {
    telegram.command('menu', async (ctx) => {
      ctx.sendMediaGroup(convertToMediaGroup(await getAttachments(DODZO_OWNER_ID, DODZO_TEXT_SEARCH_INCLUDES)));
    });
    const photos = await getAttachments(-198384075, 'Меню бизнес-ланча');

    const msgWithImages = {
      method: 'sendMediaGroup',
      chat_id: body.message.chat.id,
      media: convertToMediaGroup(photos),
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(msgWithImages),
      isBase64Encoded: false,
    };
  }

  return {
    statusCode: 200,
  };
};

// exports.handler = handler;

// handler('event', 'context');
// https://api.telegram.org/bot5715786583:AAFqc3Xl_hA9DXfpR8R0nkFWvF0fG5excDo/setWebHook?url=https://functions.yandexcloud.net/d4e3eu7r35vqu7j76tj5
