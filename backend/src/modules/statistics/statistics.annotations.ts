export const annotationsStatistics: {
  [key: string]: (query) => void;
} = {
  rating(query) {
    query.addSelect([
      'Avg(rating.rating) as rating',
      'Count(rating.id) as count',
    ]);
    query.leftJoin('rating', 'rating', `entity.id = rating.gameId`);
    query.addGroupBy('entity.id');
  },
  countPlayed(query) {
    query.addSelect(['Count(session.id) as countPlayed']);
    query.leftJoin(
      'session',
      'session',
      'session.gameId = entity.id && session.isVirtual = false',
    );
    query.addGroupBy('entity.id');
    // query.addSelect(
    //   subQuery =>
    //     subQuery
    //       .select('Count(*)', 'count')
    //       .from('session', 'session')
    //       .where(`session.gameId = entity.id`)
    //       .andWhere('session.isVirtual = false'),
    //   'countPlayed',
    // );
  },
  timePlayed(query) {
    const queryPlaytime = query.connection
      .createQueryBuilder()
      .select(
        'COALESCE(SUM(TIMESTAMPDIFF(SECOND, playtime.start, playtime.end)), 0)',
      )
      .from('playtime', 'playtime')
      .where('playtime.sessionId = session.id');

    const querySession = query.connection
      .createQueryBuilder()
      .select(`COALESCE(SUM((${queryPlaytime.getQuery()})), 0)`)
      .from('session', 'session')
      .where('session.gameId = entity.id')
      .andWhere('session.isVirtual = false');

    query.addSelect(`(${querySession.getQuery()})`, 'timePlayed');
  },
};
