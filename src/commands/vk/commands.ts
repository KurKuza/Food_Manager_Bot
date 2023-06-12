import { VK } from 'vk-io';
import { WallWallpostFull } from 'vk-io/lib/api/schemas/objects';
import { WallGetResponse } from 'vk-io/lib/api/schemas/responses';
import { IConfigService } from '../../config/config.interface';

export class VKService {
  vk: VK;
  constructor(private readonly configService: IConfigService) {
    this.vk = new VK({ token: this.configService.get('VK_TOKEN') });
  }

  public getAttachments = async (ownerId: number, textIncludes: string) => {
    const wall: WallGetResponse = await this.vk.api.wall.get({ count: 10, owner_id: ownerId });
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

    console.log('🚀  photoUrls:', photoUrls);
    return photoUrls;
  };
}
