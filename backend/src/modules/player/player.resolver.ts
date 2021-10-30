import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';
import { Player } from './player.entity';
import { PlayerInput, UpdatePlayerInput } from './player.input';
import {PrismaService} from "../../utilities/collection/prisma.service";
import {Prisma} from "@prisma/client";
import {getQuery} from "../../utilities/utilities";
import {InputCollection} from "../../utilities/collection/collection.input";

const queryPlayers = (data: Partial<InputCollection> = {}) => getQuery(`
  SELECT
     entity.id,
     entity.name,
     MAX(playtime.end) as lastSession
  FROM
    player as entity
    LEFT JOIN
      session_players_player 
        ON entity.id = session_players_player.playerId
    LEFT JOIN 
      session
        ON session.id = session_players_player.sessionId
    LEFT JOIN
      playtime
          ON session.id = playtime.sessionId
`, data);

const queryPlayer = (id: string) => {
  return queryPlayers({
    filters: [
      {
        field: 'entity.id',
        valueInt: parseInt(id, 10),
        operator: '=',
      }
    ]
  });
}

type PlayerFromDatabase = {
  id: number,
  name: string,
  lastSession: string,
}

const mapItem = (item: PlayerFromDatabase) => ({
  ...item,
  lastSession: item.lastSession === null ? null : new Date(item.lastSession),
});

const mapItems = (items: Array<PlayerFromDatabase>) => {
  return items.map(item => mapItem(item));
};

@Resolver(() => Player)
export class PlayerResolver {
  constructor(
    private prismaService: PrismaService,
  ) {
  }

  @Query(() => [Player])
  @UseGuards(GqlAuthGuard)
  async players() {
    const items = await this.prismaService.$queryRaw<Array<PlayerFromDatabase>>(Prisma.raw(queryPlayers()));

    return mapItems(items);
  }

  @Query(() => Player)
  @UseGuards(GqlAuthGuard)
  async player(@Args({ name: 'id', type: () => ID }) id: string) {
    return mapItems(await this.prismaService.$queryRaw<Array<PlayerFromDatabase>>(Prisma.raw(queryPlayer(id))))[0];
  }

  @Mutation(() => Player)
  @UseGuards(GqlAuthGuard)
  async createPlayer(@Args('playerData') playerData: PlayerInput) {
    await this.prismaService.player.create({
      data: {
        name: playerData.name
      }
    });

    return mapItems(await this.prismaService.$queryRaw<Array<PlayerFromDatabase>>(Prisma.raw(queryPlayer(playerData.id))))[0];
  }

  @Mutation(() => Player)
  @UseGuards(GqlAuthGuard)
  async updatePlayer(@Args('playerData') playerData: UpdatePlayerInput) {
    await this.prismaService.player.update({
      where: { id: parseInt(playerData.id, 10) },
      data: {
        name: playerData.name
      }
    });

    return mapItems(await this.prismaService.$queryRaw<Array<PlayerFromDatabase>>(Prisma.raw(queryPlayer(playerData.id))))[0];
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePlayer(@Args({ name: 'id', type: () => ID }) id: string) {
    await this.prismaService.player.delete({ where: { id: parseInt(id, 10) }});
    return true;
  }
}
