import { WallWallpostFull } from 'vk-io/lib/api/schemas/objects';
import { WallGetResponse } from 'vk-io/lib/api/schemas/responses';
import { vkService } from '../services';

export const getAttachmentsVKByText = async (ownerId: number, textIncludes: string) => {
  const wall: WallGetResponse = await vkService.api.wall.get({ count: 10, owner_id: ownerId });
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
