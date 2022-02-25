import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Game } from './game.entity';
import { GameInput, GameInputDatabase, GameInputDatabaseUpdate, UpdateGameInput } from './game.input';
import { InputCollection } from '../../utilities/collection/collection.input';
import { GameCollectionData } from './collection/game.collectionData';
import { PrismaService } from "../../utilities/collection/prisma.service";
import { Prisma } from '@prisma/client'
import { getQuery, handleRelation } from "../../utilities/utilities";

const queryGames = (data: Partial<InputCollection> = {}, extractCount = false) => getQuery(`
    SELECT
      COUNT(DISTINCT entity.id) as count,
      entity.id,
      entity.name,
      entity.description,
      entity.countPlayersMin,
      entity.countPlayersMax,
      entity.minutesPlaytimeMin,
      entity.minutesPlaytimeMax,
      entity.isCoop,
      entity.complexity,
      entity.size,
      entity.isDigital,
      entity.idBGG,
      entity.ratingBGG,
      entity.images,
      AVG(rating.rating) as ratingAverage,
      COALESCE(COUNT(DISTINCT(rating.id)), 0) as ratingCount,
      group_concat(DISTINCT(mechanism.id)) as mechanisms,
      group_concat(DISTINCT(category.id)) as categories,
      group_concat(DISTINCT(mood.id)) as moods,
      group_concat(DISTINCT(universe.id)) as universes,
      Max(playtime.end) as lastSession
    FROM
        game as entity
        LEFT JOIN
          rating
          ON entity.id = rating.gameId

        LEFT JOIN
          game_mechanisms_mechanism 
            ON entity.id = game_mechanisms_mechanism.gameId
        LEFT JOIN
          mechanism 
            ON game_mechanisms_mechanism.mechanismId = mechanism.id

        LEFT JOIN
          game_categories_category
            ON entity.id = game_categories_category.gameId
        LEFT JOIN
          category
            ON game_categories_category.categoryId = category.id

        LEFT JOIN
          game_moods_mood
            ON entity.id = game_moods_mood.gameId
        LEFT JOIN
          mood
            ON game_moods_mood.moodId = mood.id

        LEFT JOIN
          game_universes_universe
            ON entity.id = game_universes_universe.gameId
        LEFT JOIN
          universe
            ON game_universes_universe.universeId = universe.id
        
        LEFT JOIN
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
`, data, extractCount);

const queryGame = (id: string | number) => {
  return queryGames({
    filters: [
      {
        field: 'entity.id',
        valueInt: typeof id === 'number' ? id : parseInt(id, 10),
        operator: '=',
      }
    ]
  });
}

type GameFromDatabase = {
  id: number,
  count: number,
  mechanisms: string,
  categories: string,
  moods: string,
  universes: string,
}

const mapItemFromDatabase = (item: GameFromDatabase) => {
  return {
    ...item,
    mechanisms: item.mechanisms !== null ? item.mechanisms.split(',').map(id => ({ id, })) : [],
    categories: item.categories !== null ? item.categories.split(',').map(id => ({ id, })) : [],
    moods: item.moods !== null ? item.moods.split(',').map(id => ({ id, })) : [],
    universes: item.universes !== null ? item.universes.split(',').map(id => ({ id, })) : [],
  }
};

const mapItemsFromDatabase = (items: Array<GameFromDatabase>) => {
  return items.map(item => mapItemFromDatabase(item));
};

@Resolver(() => Game)
export class GameResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => GameCollectionData)
  // @UseGuards(GqlAuthGuard)
  async games(@Args('gameData') data: InputCollection) {
    const items = mapItemsFromDatabase(await this.prismaService.$queryRaw<Array<GameFromDatabase>>(Prisma.raw(queryGames(data))));

    const count = await this.prismaService.$queryRaw<Array<GameFromDatabase>>(Prisma.raw(queryGames(data, true)));

    return { items, count: count[0].count };
  }

  @Query(() => Game)
  // @UseGuards(GqlAuthGuard)
  async game(@Args({ name: 'id', type: () => ID }) id: string) {
    const items = await this.prismaService.$queryRaw<Array<GameFromDatabase>>(Prisma.raw(queryGame(id)));

    return mapItemFromDatabase(items[0]);
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard)
  async createGame(@Args('gameData') gameData: GameInput) {
    delete gameData.playableWith;
    delete gameData.isExpansionOf;
    delete gameData.expansions;

    const gameDatabase: GameInputDatabase = {
      ...gameData,
      universes: handleRelation({
        nameEntity: 'universe',
        entities: gameData.universes,
      }),
      categories: handleRelation({
        nameEntity: 'category',
        entities: gameData.categories,
      }),
      mechanisms: handleRelation({
        nameEntity: 'mechanism',
        entities: gameData.mechanisms,
      }),
      moods: handleRelation({
        nameEntity: 'mood',
        entities: gameData.moods,
      }),
      // playableWith: handleRelation({
      //   nameEntity: 'playableWith',
      //   entities: gameData.playableWith,
      // }),
      // expansions: handleRelation({
      //   nameEntity: 'expansions',
      //   entities: gameData.expansions,
      // }),
    };

    // gameData.universes = this.handleRelation1({
    //   entities: gameData.universes,
    // });

    // console.warn(gameData, "gameData new");

    const game = await this.prismaService.game.create({
      // @ts-ignore
      data: gameDatabase,
    });

    const items = await this.prismaService.$queryRaw<Array<GameFromDatabase>>(Prisma.raw(queryGame(game.id)));

    return mapItemFromDatabase(items[0]);
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard)
  async updateGame(@Args('gameData') gameData: UpdateGameInput) {
    delete gameData.playableWith;
    delete gameData.isExpansionOf;
    delete gameData.expansions;

    let gameDatabase: GameInputDatabaseUpdate = {
      ...gameData,
      universes: { deleteMany: {} },
      categories: { deleteMany: {} },
      mechanisms: { deleteMany: {} },
      moods: { deleteMany: {} },
    };

    delete gameDatabase.id;

    await this.prismaService.game.update({
      where: { id: parseInt(gameData.id) },
      // @ts-ignore
      data: gameDatabase,
    });

    gameDatabase = {
      ...gameData,
      universes: handleRelation({
        nameEntity: 'universe',
        entities: gameData.universes,
      }),
      categories: handleRelation({
        nameEntity: 'category',
        entities: gameData.categories,
      }),
      mechanisms: handleRelation({
        nameEntity: 'mechanism',
        entities: gameData.mechanisms,
      }),
      moods: handleRelation({
        nameEntity: 'mood',
        entities: gameData.moods,
      }),
    };

    delete gameDatabase.id;

    const game = await this.prismaService.game.update({
      where: { id: parseInt(gameData.id) },
      // @ts-ignore
      data: gameDatabase,
    });

    const items = await this.prismaService.$queryRaw<Array<GameFromDatabase>>(Prisma.raw(queryGame(game.id)));

    return mapItemFromDatabase(items[0]);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteGame(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.game.delete({ where: { id: parseInt(id, 10) } });
    return true;
  }
}
