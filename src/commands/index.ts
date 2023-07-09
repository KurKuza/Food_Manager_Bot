import { DODZO_OWNER_ID, DODZO_TEXT_SEARCH_INCLUDES } from '../constants/dodzo';
import { getAttachmentsVKByText } from '../helpers/getAttachmentsVKByText';
import { returnResponseToTelegram } from '../helpers/returnResponseToTelegram';
import { convertToMediaGroup } from '../helpers/telegram/convertToMediaGroup';

export const startPoll = (chatId: unknown) => {
  const msg = {
    method: 'sendPoll',
    chat_id: chatId,
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
};

export const getMenu = async (chatId: unknown) => {
  const dodzoPhotos = await getAttachmentsVKByText(DODZO_OWNER_ID, DODZO_TEXT_SEARCH_INCLUDES);

  dodzoPhotos.length === 3 && dodzoPhotos.pop();

  const msgWithImages = {
    method: 'sendMediaGroup',
    chat_id: chatId,
    media: convertToMediaGroup(dodzoPhotos),
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(msgWithImages),
    isBase64Encoded: false,
  };
};
