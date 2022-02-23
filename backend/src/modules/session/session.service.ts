import { PrismaService } from "../../utilities/collection/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionService {
  constructor(
    private prismaService: PrismaService,
  ) { }

  getQuerySelect() {
    return `
      entity.id,
      entity.comment,
      entity.isChallenge,
      entity.isVirtual,
      entity.gameId,
      group_concat(DISTINCT(player.id)) as players,
      group_concat(DISTINCT(winner.id)) as winners,
      MIN(playtime.start) as startMin,
      MAX(playtime.start) as startMax,
      MIN(playtime.end) as endMin,
      MAX(playtime.end) as endMax`;
  }

  getQueryFrom() {
    return `
      session as entity
      LEFT JOIN
        session_players_player
        ON entity.id = session_players_player.sessionId
      LEFT JOIN
        player
        ON session_players_player.playerId = player.id

      LEFT JOIN
        session_winners_player
        ON entity.id = session_winners_player.sessionId
      LEFT JOIN
        player as winner
        ON session_winners_player.playerId = winner.id
      LEFT JOIN
        playtime
        on entity.id = playtime.sessionId
      LEFT JOIN
        game
        on entity.gameId = game.id`;
  }
}
