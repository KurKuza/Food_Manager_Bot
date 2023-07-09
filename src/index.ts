import { getCommand } from './helpers/command';

exports.handler = async function (event: any) {
  const body = JSON.parse(event.body);
  const command = body.message.text;
  const isAcceptableCommand = command.startsWith('/');

  if (isAcceptableCommand) {
    return await getCommand(command, body.message.chat.id);
  }

  return {
    statusCode: 200,
  };
};
