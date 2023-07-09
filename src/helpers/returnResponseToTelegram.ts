import { TelegramResponse } from '../constants/types/TelegramResponse';

export const returnResponseToTelegram = (body: { method: string; chat_id: unknown }): TelegramResponse => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    isBase64Encoded: false,
  };
};
