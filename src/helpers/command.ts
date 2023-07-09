import { getMenu, startPoll } from '../commands';
import { Commands } from '../constants/enums/commands';

export const getCommand = (command: Commands, chatId: unknown) => {
  switch (command) {
    case Commands.MENU:
      return getMenu(chatId);
    case Commands.POLL:
      return startPoll(chatId);
  }
};
