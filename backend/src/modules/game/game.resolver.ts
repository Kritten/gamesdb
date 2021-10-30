import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Game } from './game.entity';
import {GameInput, GameInputDatabase, UpdateGameInput} from './game.input';
import { InputCollection } from '../../utilities/collection/collection.input';
import { GameCollectionData } from './collection/game.collectionData';
import {PrismaService} from "../../utilities/collection/prisma.service";
import { Prisma } from '@prisma/client'
import {getOrderBy, getPagination, getWhere, handleRelation} from "../../utilities/utilities";

@Resolver(() => Game)
export class GameResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => GameCollectionData)
  @UseGuards(GqlAuthGuard)
  async games(@Args('gameData') data: InputCollection) {
    const where = getWhere(data);
    const orderBy = getOrderBy(data);
    const pagination = getPagination(data);

    const query = `
        SELECT 
             entity.id,
#              entity.name,
#              entity.minutesPlaytimeMin,
#              entity.minutesPlaytimeMax,
#              entity.complexity,
#              entity.countPlayersMin,
#              entity.countPlayersMax,
#              entity.description,
#              entity.isDigital,
            COALESCE(AVG(rating.rating), 0) as ratingAverage,
            COALESCE(COUNT(rating.rating), 0) as ratingCount
        FROM 
          game as entity
          LEFT JOIN
              rating
              ON entity.id = rating.gameId
        ${where}
        GROUP BY
            entity.id
        ${orderBy}
        ${pagination}
        `;
    // const rating = await getConnection().query(`
    //   select
    //     Avg(rating.rating) as rating
    //   from
    //     game
    //   left join
    //       rating
    //       on rating.gameId = game.id
    //   where game.id = ${this.id}
    // `);
    // query.
    const items = await this.prismaService.$queryRaw<Array<Game>>(Prisma.raw(query));
    // const items = await this.prismaService.game.findMany({
    //   select: {
    //     id: true,
    //     _count: true,
    //   },
    //   skip: (data.page - 1) * data.count,
    //   take: data.count,
    //   orderBy: data.sortBy.map((sortBy, index) => ({
    //     [sortBy]: data.sortDesc[index] ? 'desc' : 'asc'
    //   })),
    //   where,
    // });

    // console.log(items, "items");

    const count = (await this.prismaService.$queryRaw<Array<{count: number}>>(Prisma.raw(`
      SELECT 
        count(entity.id) as count
      FROM
        game as entity
      ${where}
    `)))[0].count;

    return {items, count};
  }

  @Query(() => Game)
  @UseGuards(GqlAuthGuard)
  async game(@Args({ name: 'id', type: () => ID }) id: string) {
    const game = (await this.prismaService.game.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    })) as unknown as Game;

    const dataRating = await this.prismaService.rating.aggregate({
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
      where: {
        game: {
          id: game.id
        },
      }
    });

    game.ratingAverage = dataRating._avg.rating;
    game.ratingCount = dataRating._count.rating;

    return game;
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard)
  async createGame(@Args('gameData') gameData: GameInput) {
    console.warn(gameData, "gameData");
    const gameDatabase: GameInputDatabase = {
      ...gameData,
      universes: handleRelation({
        entities: gameData.universes,
      }),
      categories: handleRelation({
        entities: gameData.categories,
      }),
      mechanisms: handleRelation({
        entities: gameData.mechanisms,
      }),
      moods: handleRelation({
        entities: gameData.moods,
      }),
      playableWith: handleRelation({
        entities: gameData.playableWith,
      }),
      expansions: handleRelation({
        entities: gameData.expansions,
      }),
    };


    console.warn(gameDatabase, "gameDatabase");
    // gameData.universes = this.handleRelation1({
    //   entities: gameData.universes,
    // });

    console.warn(gameData, "gameData new");

    const game = await this.prismaService.game.create({
      data: gameData,
    });
    //
    // return game;
    // const game = new Game();
    // game.name = gameData.name;
    // game.description = gameData.description;
    // game.idBGG = gameData.idBGG;
    // game.ratingBGG = gameData.ratingBGG;
    // game.countPlayersMin = gameData.countPlayersMin;
    // game.countPlayersMax = gameData.countPlayersMax;
    // game.minutesPlaytimeMin = gameData.minutesPlaytimeMin;
    // game.minutesPlaytimeMax = gameData.minutesPlaytimeMax;
    // game.isCoop = gameData.isCoop;
    // game.isDigital = gameData.isDigital;
    // game.complexity = gameData.complexity;
    // game.size = gameData.size;
    // game.images = gameData.images;
    // await this.handleRelation(
    //   'universes',
    //   game,
    //   gameData,
    //   this.universeService,
    // );
    // await this.handleRelation(
    //   'categories',
    //   game,
    //   gameData,
    //   this.categoryService,
    // );
    // await this.handleRelation(
    //   'mechanisms',
    //   game,
    //   gameData,
    //   this.mechanismService,
    // );
    // await this.handleRelation('moods', game, gameData, this.moodService);
    // await this.handleRelation(
    //   'playableWith',
    //   game,
    //   gameData,
    //   this.gameEntityService,
    // );
    // await this.handleRelation(
    //   'isExpansionOf',
    //   game,
    //   gameData,
    //   this.gameEntityService,
    // );
    // await this.handleRelation(
    //   'expansions',
    //   game,
    //   gameData,
    //   this.gameEntityService,
    // );
    // await this.handleRelation('sessions', game, gameData, this.sessionService);
    //
    // return await this.gameEntityService.create(game);
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard)
  async updateGame(@Args('gameData') gameData: UpdateGameInput) {
    return ;
    // const game = new Game();
    // game.id = parseInt(gameData.id, 10);
    // game.name = gameData.name;
    // game.idBGG = gameData.idBGG;
    // game.ratingBGG = gameData.ratingBGG;
    // game.description = gameData.description;
    // game.countPlayersMin = gameData.countPlayersMin;
    // game.countPlayersMax = gameData.countPlayersMax;
    // game.minutesPlaytimeMin = gameData.minutesPlaytimeMin;
    // game.minutesPlaytimeMax = gameData.minutesPlaytimeMax;
    // game.isCoop = gameData.isCoop;
    // game.isDigital = gameData.isDigital;
    // game.complexity = gameData.complexity;
    // game.size = gameData.size;
    // game.images = gameData.images;
    // await handleRelation(
    //   'universes',
    //   game,
    //   gameData,
    //   this.universeService,
    // );
    // await handleRelation(
    //   'categories',
    //   game,
    //   gameData,
    //   this.categoryService,
    // );
    // await handleRelation(
    //   'mechanisms',
    //   game,
    //   gameData,
    //   this.mechanismService,
    // );
    // await handleRelation('moods', game, gameData, this.moodService);
    // await handleRelation(
    //   'playableWith',
    //   game,
    //   gameData,
    //   this.gameEntityService,
    // );
    // await handleRelation(
    //   'isExpansionOf',
    //   game,
    //   gameData,
    //   this.gameEntityService,
    // );
    // await handleRelation(
    //   'expansions',
    //   game,
    //   gameData,
    //   this.gameEntityService,
    // );
    // await handleRelation('sessions', game, gameData, this.sessionService);
    //
    // return await this.gameEntityService.update(game);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteGame(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.game.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
