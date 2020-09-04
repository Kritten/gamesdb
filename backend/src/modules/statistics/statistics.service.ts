import { getConnection } from 'typeorm';
import { Game } from '../game/game.entity';
import { InputCollection } from '../../utilities/collection/collection.input';
import { CollectionService } from '../../utilities/collection/collection.service';
import { Inject } from '@nestjs/common';

export class StatisticsService {
  constructor(
    @Inject('CollectionService')
    private collectionService: CollectionService<any>,
  ) {
    console.warn(collectionService, 'collectionService');
  }

  async gamesCountPlayed(data: InputCollection) {
    const query = await getConnection()
      .createQueryBuilder(Game, 'entity')
      .select(['entity.id', 'entity.name']);

    query.addSelect(
      subQuery =>
        subQuery
          .select('Count(*)', 'count')
          .from('session', 'session')
          .where(`session.gameId = entity.id`),
      'countPlayed',
    );

    this.collectionService.where(query, data);
    // query.orderBy(`countPlayed`, 'DESC');
    this.collectionService.orderBy(query, data);

    const count = query.getCount();

    this.collectionService.paginate(query, data);

    const items = await query.getRawMany();
    return {
      items: items.map(item => ({
        id: item.entity_id,
        name: item.entity_name,
        countPlayed: item.countPlayed,
      })),
      count,
    };
  }
}
