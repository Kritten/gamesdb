import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import { store } from '@/modules/app/app.store';
import { Session } from '@/modules/session/session.model';
import { mutationCreateSession, queryPageSession } from '@/modules/session/graphql/session.graphql';
import { Playtime } from '@/modules/playtime/playtime.model';
import { Game } from '@/modules/game/game.model';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { ID } from '@/modules/app/utilities/entity/entity.types';
import { queue } from '@/queue';
import {
  ServiceCollectionStatic,
  ServiceCollectionLoadPageParameters,
  ServiceCollectionLoadPageReturn,
} from '@/modules/app/utilities/collection/collection.types';

export const ServiceSession: ServiceCollectionStatic = class {
  static useCreate(game: Game) {
    const session = ref(new Session({ game: game.id }));

    const playtimeNew = ref(new Playtime());

    const playtimeAdd = () => {
      session.value.playtimes.push(playtimeNew.value);
      playtimeNew.value = new Playtime();
    };
    const playtimeRemove = playtime => {
      session.value.playtimes = session.value.playtimes.filter(
        playtimeCurrent =>
          !(playtimeCurrent.start === playtime.start && playtimeCurrent.end === playtime.end),
      );
    };

    return {
      session,
      playtimeNew,
      playtimeAdd,
      playtimeRemove,
      create: async () => {
        await ServiceSession.create(session.value);
        session.value = new Session();
      },
    };
  }

  static async create(session: Session) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateSession,
      variables: {
        session,
      },
    });
    console.warn('response', response);

    queue.notify('createdSession', new Session(response.data.session));
  }
  static async loadPage({
    page,
    count,
    sortBy,
    sortDesc,
    params,
  }: ServiceCollectionLoadPageParameters): ServiceCollectionLoadPageReturn {
    const response = await apolloClient.query({
      query: queryPageSession,
      variables: {
        page,
        count,
        sortBy,
        sortDesc,
        ...params,
      },
    });

    const entities: Entity[] = await Promise.all(
      response.data.sessions.items.map((session: Session) => Session.parseFromServer(session)),
    );

    store.commit(
      'moduleSession/setSessionsIfNotExisting',
      entities.reduce((obj, entity) => {
        obj[entity.id as ID] = entity;
        return obj;
      }, {} as Partial<{ [key in ID]: Entity }>),
    );

    return {
      count: response.data.sessions.count,
      items: entities,
    };
  }
};
