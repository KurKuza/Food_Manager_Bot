import { MediaGroup } from 'telegraf/typings/telegram-types';

export const convertToMediaGroup = (photos: string[]): MediaGroup => {
  const photosGroup = photos.map((photo) => ({ type: 'photo', media: photo }));

  return photosGroup as MediaGroup;
};
