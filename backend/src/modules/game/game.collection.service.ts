import { Game } from './game.entity';
import { CollectionService } from '../../utilities/collection/collection.service';
import { GameEntityService } from './game.entity.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameCollectionService extends CollectionService<Game> {
  constructor(private gameEntityService: GameEntityService) {
    super(Game, gameEntityService);
  }
}
