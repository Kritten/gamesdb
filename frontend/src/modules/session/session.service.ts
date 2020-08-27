import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import { store } from '@/modules/app/app.store';
import { Session } from '@/modules/session/session.model';
import {
  mutationCreateSession,
  mutationDeleteSession,
  queryPageSession,
} from '@/modules/session/graphql/session.graphql';
import { Playtime } from '@/modules/playtime/playtime.model';
import { Game } from '@/modules/game/game.model';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { ID, ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { queue } from '@/queue';
import {
  ServiceCollectionInterface,
  ServiceCollectionLoadPageParameters,
} from '@/modules/app/utilities/collection/collection.types';

class ServiceSessionClass
  implements ServiceCollectionInterface<Session>, ServiceEntityInterface<Session> {
  useCreate(game: Game) {
    const session = ref(new Session({ game }));

    const playtimeNew = ref(new Playtime());

    const playtimeAdd = () => {
      session.value.playtimes.push(playtimeNew.value);
      playtimeNew.value = new Playtime();
    };
    const playtimeRemove = (playtime: Playtime) => {
      session.value.playtimes = session.value.playtimes.filter(
        playtimeCurrent =>
          !(playtimeCurrent.start === playtime.start && playtimeCurrent.end === playtime.end),
      );
    };

    return {
      entity: session,
      playtimeNew,
      playtimeAdd,
      playtimeRemove,
      create: async () => {
        const sessionNew = await this.create(session.value);
        session.value = new Session({ game });
        return sessionNew;
      },
    };
  }

  useDelete() {
    return {
      delete: (session: Session) => this.delete(session),
    };
  }

  async create(session: Session) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateSession,
      variables: {
        session: session.prepareForServer(),
      },
    });

    const sessionNew = await Session.parseFromServer(response.data.createSession);

    queue.notify('createdSession', sessionNew);

    return sessionNew;
  }
  async loadPage({ page, count, sortBy, sortDesc, params }: ServiceCollectionLoadPageParameters) {
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

    const entities: Session[] = await Promise.all(
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

  async delete(session: Session) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteSession,
      variables: {
        id: session.id,
      },
    });

    queue.notify('deletedSession', session);

    return response.data.deleteSession;
  }
}

export const ServiceSession = new ServiceSessionClass();
