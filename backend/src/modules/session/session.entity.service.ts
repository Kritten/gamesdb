import { Session } from './session.entity';
import { EntityService } from '../../utilities/entity/entity.service';

export class SessionEntityService extends EntityService<Session> {
  constructor() {
    super(
      Session,
      { relations: ['game', 'players', 'winners', 'playtimes'] },
      [
        (query, data) => {
        // console.warn(query, "query");

        const playtimeLast = query.connection
          .createQueryBuilder()
          .select(
            'MAX(playtime.end)'
          )
          .from('playtime', 'playtime')
          .where('playtime.sessionId = entity.id');

          // const queryPlaytime = query.connection
          //   .createQueryBuilder()
          //   .select(
          //     'COALESCE(SUM(TIMESTAMPDIFF(SECOND, playtime.start, playtime.end)), 0)',
          //   )
          //   .from('playtime', 'playtime')
          //   .where('playtime.sessionId = session.id');

          // const querySession = query.connection
          //   .createQueryBuilder()
          //   .select(`COALESCE(SUM((${queryPlaytime.getQuery()})), 0)`)
          //   .from('session', 'session')
          //   .where('session.gameId = entity.id')
          //   .andWhere('session.isVirtual = false');

          query.addSelect(`(${playtimeLast.getQuery()})`, 'playtimeLast');
        }
      ],
    );
  }
}
