import { getConnection } from 'typeorm';
import { Game } from '../game/game.entity';
import { InputCollection } from '../../utilities/collection/collection.input';
import { CollectionService } from '../../utilities/collection/collection.service';
import { Inject } from '@nestjs/common';
import { Playtime } from '../playtime/playtime.entity';

export class StatisticsService {
  constructor(
    @Inject('CollectionService')
    private collectionService: CollectionService<any>,
  ) {}

  async gamesCountPlayed(data: InputCollection) {
    const query = await getConnection()
      .createQueryBuilder(Game, 'entity')
      .select(['entity.id', 'entity.name']);

    query.addSelect(
      subQuery =>
        subQuery
          .select('Count(*)', 'count')
          .from('session', 'session')
          .where(`session.gameId = entity.id`)
          .andWhere('session.isVirtual = false'),
      'countPlayed',
    );

    this.collectionService.where(query, data);

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

  async gamesTimePlayed(data: InputCollection) {
    const queryPlaytime = await getConnection()
      .createQueryBuilder()
      .select(
        'COALESCE(SUM(TIMESTAMPDIFF(SECOND, playtime.start, playtime.end)), 0)',
      )
      .from('playtime', 'playtime')
      .where('playtime.sessionId = session.id');

    const querySession = await getConnection()
      .createQueryBuilder()
      .select(`COALESCE(SUM((${queryPlaytime.getQuery()})), 0)`)
      .from('session', 'session')
      .where('session.gameId = entity.id')
      .andWhere('session.isVirtual = false');

    const query = await getConnection()
      .createQueryBuilder()
      .select(['entity.id', 'entity.name'])
      .from(Game, 'entity')
      .addSelect(`(${querySession.getQuery()})`, 'timePlayed');

    this.collectionService.where(query, data);

    this.collectionService.orderBy(query, data);

    const count = query.getCount();

    this.collectionService.paginate(query, data);

    const items = await query.getRawMany();

    return {
      items: items.map(item => ({
        id: item.entity_id,
        name: item.entity_name,
        timePlayed: item.timePlayed,
      })),
      count,
    };
  }

  async gamesBestRated(data: InputCollection) {
    const query = await getConnection()
      .createQueryBuilder(Game, 'entity')
      .select([
        'entity.id',
        'entity.name',
        'Avg(rating.rating) as rating',
        'Count(rating.id) as count',
      ]);

    query.leftJoin('rating', 'rating', `entity.id = rating.gameId`);
    query.groupBy('entity.id');

    this.collectionService.where(query, data);

    this.collectionService.orderBy(query, data);

    const count = query.getCount();

    this.collectionService.paginate(query, data, false);

    const items = await query.getRawMany();

    return {
      items: items.map(item => ({
        id: item.entity_id,
        name: item.entity_name,
        rating: item.rating,
        count: item.count,
      })),
      count,
    };
  }

  async playtimesGroupedByDaytime(data: InputCollection) {
    console.log(data, 'data');
    let where = '';

    const filterIsDigital = data.filters.find(
      filter => filter.field === 'isDigital',
    );

    if (filterIsDigital !== undefined) {
      where += `and game.isDigital = ${filterIsDigital.valueBoolean}`;
    }

    const orderBy = `${data.sortBy} ${data.sortDesc ? 'DESC' : 'ASC'}`;

    const result = await getConnection().query(`
      with recursive days as (
        select
          '2020-08-25 00:00:00' as day_start,
          '2020-08-25 23:59:59' as day_end
        union
          all
        select
          date_add(day_start, interval 1 day),
          date_add(day_end, interval 1 day)
        from
          days
        where
          day_start < '2020-09-12 00:00:00'
      )
      select
        days.day_start,
        days.day_end,
        (
          select
            COALESCE(
                sum(
                    case when playtime.start >= days.day_start
                      and playtime.end <= days.day_end then TIMESTAMPDIFF(SECOND, playtime.start, playtime.end) when playtime.start >= days.day_start
                      and playtime.end > days.day_end then TIMESTAMPDIFF(SECOND, playtime.start, days.day_end) when playtime.start < days.day_start
                      and playtime.end <= days.day_end then TIMESTAMPDIFF(SECOND, days.day_start, playtime.end) else 86400 end
                  ),
                0
              )
          from
            playtime
              left join session session on playtime.sessionId = session.id
              left join game game on session.gameId = game.id
          where
            playtime.start <= days.day_end
            and days.day_start <= playtime.end
            ${where}
        ) as foo
      from
        days
      order by ${orderBy}`);

    console.log(result, 'result');

    const query = await getConnection()
      .createQueryBuilder()
      .from(Playtime, 'playtime');

    this.collectionService.orderBy(query, data);

    // const count = query.getCount();

    // this.collectionService.paginate(query, data);
    // console.log(query.getSql(), 'query');
    const items = await query.getRawMany();
    console.log(items, 'items');
    // return {
    //   items: items.map(item => ({
    //     id: item.entity_id,
    //     name: item.entity_name,
    //     countPlayed: item.countPlayed,
    //   })),
    //   count,
    // };
    return {
      count: 10,
      items: [
        {
          data: [1, 2, 3, 4],
        },
      ],
    };
  }
}
