import { Telegraf } from 'telegraf';
import { VK } from 'vk-io';

export const vkService = new VK({ token: process.env.VK_TOKEN });
export const telegramService = new Telegraf(process.env.BOT_TOKEN, { telegram: { webhookReply: true } });
