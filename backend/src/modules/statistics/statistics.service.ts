import { Game } from '../game/game.entity';
import { InputCollection } from '../../utilities/collection/collection.input';
import { PrismaService } from "../../utilities/collection/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { getOrderBy, getPagination, getWhere } from "../../utilities/utilities";
import { SessionService } from 'src/modules/session/session.service';
import { Session } from 'src/modules/session/session.entity';
import { SessionFromDatabase } from 'src/modules/session/session.type';
import { PlaytimeResolver } from 'src/modules/playtime/playtime.resolver';
import { SessionResolver } from 'src/modules/session/session.resolver';

@Injectable()
export class StatisticsService {
  constructor(
    private prismaService: PrismaService,
    private sessionService: SessionService,
    private sessionResolver: SessionResolver,
    private playtimeResolver: PlaytimeResolver,
  ) { }

  async counts() {
    const results = await Promise.all([
      this.prismaService.game.count({
        where: {
          isDigital: true,
        }
      }),
      this.prismaService.game.count({
        where: {
          isDigital: false,
        }
      }),
      this.prismaService.rating.count(),
      this.prismaService.wishlist.count(),
    ]);

    return {
      gamesDigital: results[0],
      gamesAnalog: results[1],
      ratings: results[2],
      wishlists: results[3],
    };
  }

  async gamesCountPlayed(data: InputCollection) {
    const where = getWhere(data);
    const orderBy = getOrderBy(data);
    const pagination = getPagination(data);

    const query = `
        SELECT 
             entity.id, 
             entity.name,
             Count(session.id) as countPlayed
        FROM 
          game as entity
          LEFT JOIN
              session
              ON entity.id = session.gameId
        ${where}
        GROUP BY
            entity.id
        ${orderBy}
        ${pagination}
        `;

    const items = await this.prismaService.$queryRaw<Array<Game>>(Prisma.raw(query));

    const count = (await this.prismaService.$queryRaw<Array<{ count: number }>>(Prisma.raw(`
      SELECT 
        count(entity.id) as count
      FROM
        game as entity
      ${where}
    `)))[0].count;

    return {
      items,
      count,
    };
  }

  //   (
  //    SELECT 
  //    session.id
  //    FROM
  //      session as session
  //      LEFT JOIN
  //        playtime
  //        on session.id = playtime.sessionId
  //    WHERE
  //      session.gameId = entity.id AND
  //      session.isVirtual = false
  //    GROUP BY
  //        session.id
  //    ORDER By MAX(playtime.end) desc
  //    LIMIT 1
  //  ) as session

  async gamesLastPlayed(data: InputCollection) {
    const where = getWhere(data);
    // const orderBy = getOrderBy(data);
    const pagination = getPagination(data);

    // TODO: hier muss die Ermittlung der Session noch verbessert werden, bzw. muss geguckt werden, warum 
    // die Spiele zurzeit richtig sortiert werden, obwohl ich einfach nur auf die Playtime gehe
    const query = `
        SELECT 
          entity.id, 
          entity.name,
          joinedsession.id as session,
          Max(playtime.end) as lastSession
        FROM 
          game as entity
          INNER JOIN
            (
              SELECT 
                session.id, 
                session.gameId, 
                session.isVirtual 
              FROM 
                session as session 
              LEFT JOIN
                playtime
                on session.id = playtime.sessionId
              GROUP BY 
                session.id
              ORDER By MAX(playtime.end) desc
            ) as joinedsession
              on joinedsession.gameid = entity.id AND
              joinedsession.isVirtual = false
          LEFT JOIN
            playtime as playtime
              on playtime.sessionId = joinedsession.id
        ${where}
        GROUP BY
            entity.id
        ORDER BY
          lastSession DESC
        ${pagination}
        `;

    let games = await this.prismaService.$queryRaw<Array<{ id: number, name: string, session: number | null }>>(Prisma.raw(query));

    const count = (await this.prismaService.$queryRaw<Array<{ count: number }>>(Prisma.raw(`
      SELECT 
        count(entity.id) as count
      FROM
        game as entity
      ${where}
    `)))[0].count;

    // console.log('games', games);

    // console.warn('#########################');

    // const sessions = await this.prismaService.session.findMany({
    //   where: {
    //     id: {
    //       in: games.map(game => game.session).filter(id => id !== null),
    //     }
    //   }
    // });

    // console.log('sessions', sessions);

    // games = await Promise.all(games.map(async (game) => {
    //   // const sessions = await this.sessionResolver.sessions({
    //   //   filters: [
    //   //     {
    //   //       field: 'gameId',
    //   //       valueInt: game.id,
    //   //       operator: '=',
    //   //     }
    //   //   ],
    //   //   page: 1,
    //   //   count: null,
    //   //   sortBy: ['start'],
    //   //   sortDesc: [false],
    //   });

    //   console.log('sessions', sessions)

    //   // const playtimes = await this.playtimeResolver.playtimes({
    //   //   filters: [
    //   //     {
    //   //       field: 'sessionId',
    //   //       valueInt: game.id,
    //   //       operator: '=',
    //   //     }
    //   //   ],
    //   //   page: 1,
    //   //   count: null,
    //   //   sortBy: ['start'],
    //   //   sortDesc: [false],
    //   // });

    //   // return {
    //   //   ...game,
    //   //   playtimes: playtimes.items,
    //   // };
    //   return game;
    // }));

    const querySessions = `
        SELECT 
          ${this.sessionService.getQuerySelect()}
        FROM 
          ${this.sessionService.getQueryFrom()}
        WHERE
          entity.id in (${games.map(game => game.session).filter(id => id !== null).join(',')})
        GROUP BY
          entity.id
        `;

    // console.warn(querySessions)

    let sessions = await this.prismaService.$queryRaw<Array<SessionFromDatabase>>(Prisma.raw(querySessions));

    sessions = await Promise.all(sessions.map(async (item) => {
      const playtimes = await this.playtimeResolver.playtimes({
        filters: [
          {
            field: 'sessionId',
            valueInt: item.id,
            operator: '=',
          }
        ],
        page: 1,
        count: null,
        sortBy: ['start'],
        sortDesc: [false],
      });

      return {
        ...item,
        playtimes: playtimes.items,
      };
    }));

    const mapSessions = new Map(sessions.map(session => [session.gameId, session]));
    // console.log('mapSessions', mapSessions)

    // console.warn(games);
    // console.warn(games.map(game => ({
    //   id: game.id,
    //   name: game.name,
    //   session: 34,
    //   // session: mapSessions.get(game.id),
    // })));

    return {
      items: games.map(game => ({
        id: game.id,
        name: game.name,
        session: mapSessions.get(game.id),
      })).filter(game => game.session !== undefined),
      count,
    };
  }

  async gamesTimePlayed(data: InputCollection) {
    const where = getWhere(data);
    const orderBy = getOrderBy(data);
    const pagination = getPagination(data);

    const query = `
        SELECT 
          entity.id, 
          entity.name,
          (
            SELECT COALESCE(SUM((
              SELECT
                COALESCE(SUM(TIMESTAMPDIFF(SECOND, playtime.start, playtime.end)), 0)
                FROM 
                    playtime as playtime
                WHERE
                    playtime.sessionId = session.id
            )), 0)
            FROM
              session as session
            WHERE
              session.gameId = entity.id AND
              session.isVirtual = false
          ) as timePlayed
        FROM 
          game as entity
          LEFT JOIN
              session
              ON entity.id = session.gameId
        ${where}
        GROUP BY
            entity.id
        ${orderBy}
        ${pagination}
        `;

    const items = await this.prismaService.$queryRaw<Array<Game>>(Prisma.raw(query));

    const count = (await this.prismaService.$queryRaw<Array<{ count: number }>>(Prisma.raw(`
      SELECT 
        count(entity.id) as count
      FROM
        game as entity
      ${where}
    `)))[0].count;

    return {
      items,
      count,
    }


    // const queryPlaytime = query.connection
    //   .createQueryBuilder()
    //   .select(
    //     'COALESCE(SUM(TIMESTAMPDIFF(SECOND, playtime.start, playtime.end)), 0)',
    //   )
    //   .from('playtime', 'playtime')
    //   .where('playtime.sessionId = session.id');
    //
    // const querySession = query.connection
    //   .createQueryBuilder()
    //   .select(`COALESCE(SUM((${queryPlaytime.getQuery()})), 0)`)
    //   .from('session', 'session')
    //   .where('session.gameId = entity.id')
    //   .andWhere('session.isVirtual = false');
    //
    // query.addSelect(`(${querySession.getQuery()})`, 'timePlayed');

    // const query = await getConnection()
    //   .createQueryBuilder()
    //   .from(Game, 'entity')
    //   .select(['entity.id', 'entity.name']);
    // annotationsStatistics.timePlayed(query);
    //
    // this.collectionService.where(query, data);
    //
    // this.collectionService.orderBy(query, data);
    //
    // const count = query.getCount();
    //
    // this.collectionService.paginate(query, data);
    //
    // const items = await query.getRawMany();
    //
    // return {
    //   items: items.map(item => ({
    //     id: item.entity_id,
    //     name: item.entity_name,
    //     timePlayed: item.timePlayed,
    //   })),
    //   count,
    // };
  }

  async playtimesGroupedByDaytime(data: InputCollection) {
    const where = getWhere(data);
    const orderBy = getOrderBy(data);
    const pagination = getPagination(data);

    const query = `
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
      order by ${orderBy}
    `;

    const items = await this.prismaService.$queryRaw<Array<Game>>(Prisma.raw(query));
    console.warn(items, "items");
    return {
      items: [],
      count: 0,
    };
    // console.log(data, 'data');
    // let where = '';
    //
    // const filterIsDigital = data.filters.find(
    //   filter => filter.field === 'isDigital',
    // );
    //
    // if (filterIsDigital !== undefined) {
    //   where += `and game.isDigital = ${filterIsDigital.valueBoolean}`;
    // }
    //
    // const orderBy = `${data.sortBy} ${data.sortDesc ? 'DESC' : 'ASC'}`;
    //
    // const result = await getConnection().query(`
    //   with recursive days as (
    //     select
    //       '2020-08-25 00:00:00' as day_start,
    //       '2020-08-25 23:59:59' as day_end
    //     union
    //       all
    //     select
    //       date_add(day_start, interval 1 day),
    //       date_add(day_end, interval 1 day)
    //     from
    //       days
    //     where
    //       day_start < '2020-09-12 00:00:00'
    //   )
    //   select
    //     days.day_start,
    //     days.day_end,
    //     (
    //       select
    //         COALESCE(
    //             sum(
    //                 case when playtime.start >= days.day_start
    //                   and playtime.end <= days.day_end then TIMESTAMPDIFF(SECOND, playtime.start, playtime.end) when playtime.start >= days.day_start
    //                   and playtime.end > days.day_end then TIMESTAMPDIFF(SECOND, playtime.start, days.day_end) when playtime.start < days.day_start
    //                   and playtime.end <= days.day_end then TIMESTAMPDIFF(SECOND, days.day_start, playtime.end) else 86400 end
    //               ),
    //             0
    //           )
    //       from
    //         playtime
    //           left join session session on playtime.sessionId = session.id
    //           left join game game on session.gameId = game.id
    //       where
    //         playtime.start <= days.day_end
    //         and days.day_start <= playtime.end
    //         ${where}
    //     ) as foo
    //   from
    //     days
    //   order by ${orderBy}`);
    //
    // console.log(result, 'result');
    //
    // const query = await getConnection()
    //   .createQueryBuilder()
    //   .from(Playtime, 'playtime');
    //
    // this.collectionService.orderBy(query, data);
    //
    // // const count = query.getCount();
    //
    // // this.collectionService.paginate(query, data);
    // // console.log(query.getSql(), 'query');
    // const items = await query.getRawMany();
    // console.log(items, 'items');
    // // return {
    // //   items: items.map(item => ({
    // //     id: item.entity_id,
    // //     name: item.entity_name,
    // //     countPlayed: item.countPlayed,
    // //   })),
    // //   count,
    // // };
    // return {
    //   count: 10,
    //   items: [
    //     {
    //       data: [1, 2, 3, 4],
    //     },
    //   ],
    // };
  }
}
