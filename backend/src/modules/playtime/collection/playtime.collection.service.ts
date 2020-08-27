import { CollectionService } from '../../../utilities/collection/collection.service';
import { Injectable } from '@nestjs/common';
import { Playtime } from '../playtime.entity';
import { PlaytimeEntityService } from '../playtime.entity.service';

@Injectable()
export class PlaytimeCollectionService extends CollectionService<Playtime> {
  constructor(private playtimeEntityService: PlaytimeEntityService) {
    super(Playtime, playtimeEntityService);
  }
}
