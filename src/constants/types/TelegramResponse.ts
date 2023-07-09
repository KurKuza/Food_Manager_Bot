export type TelegramResponse = {
  statusCode: number;
  headers: {
    'Content-Type': string;
  };
  body: string;
  isBase64Encoded: boolean;
};
