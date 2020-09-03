import { Ref, ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import { store } from '@/modules/app/app.store';
import { Session } from '@/modules/session/session.model';
import {
  mutationCreateSession,
  mutationDeleteSession,
  mutationUpdateSession,
  queryPageSession,
} from '@/modules/session/graphql/session.graphql';
import { Playtime } from '@/modules/playtime/playtime.model';
import { Game } from '@/modules/game/game.model';
import { Entity } from '@/modules/app/utilities/entity/entity.model';
import { ID, ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';
import { queue } from '@/queue';
import { ServiceCollectionInterface } from '@/modules/app/utilities/collection/collection.types';
import { InputCollection } from '@backend/src/utilities/collection/collection.input';
import { cloneDeep } from 'lodash';
import { compareAsc } from 'date-fns';

class ServiceSessionClass
  implements ServiceCollectionInterface<Session>, ServiceEntityInterface<Session> {
  private static playtimeAdd(session: Ref<Session>, playtimeNew: Ref<Playtime>) {
    session.value.playtimes.push(playtimeNew.value);
    playtimeNew.value = new Playtime();
  }

  private playtimeRemove(session: Ref<Session>, playtime: Playtime) {
    session.value.playtimes = session.value.playtimes.filter(
      (playtimeCurrent: Playtime) =>
        !(playtimeCurrent.start === playtime.start && playtimeCurrent.end === playtime.end),
    );
  }

  useLastSession({
    analogOnly = false,
    digitalOnly = false,
  }: {
    analogOnly?: boolean;
    digitalOnly?: boolean;
  } = {}) {
    const session = ref<Session>();
    const lastDate = ref<Date>();

    const filters = [];
    if (analogOnly) {
      filters.push({
        field: 'game.isDigital',
        valueBoolean: false,
        operator: '=',
      });
    } else if (digitalOnly) {
      filters.push({
        field: 'game.isDigital',
        valueBoolean: true,
        operator: '=',
      });
    }

    this.loadPage({
      count: 1,
      page: 1,
      sortBy: 'playtime.MAX(start)',
      sortDesc: true,
      filters,
    }).then(async ({ items }) => {
      if (items.length > 0) {
        session.value = items[0];
        lastDate.value = session.value.playtimes.map(playtime => playtime.end).sort(compareAsc)[
          session.value.playtimes.length - 1
        ];
      }
    });

    return {
      session,
      lastDate,
    };
  }

  useCreate(game: Game) {
    const session = ref(new Session({ game, isChallenge: false }));

    const playtimeNew = ref(new Playtime());

    return {
      entity: session,
      playtimeNew,
      playtimeAdd: () => ServiceSessionClass.playtimeAdd(session, playtimeNew),
      playtimeRemove: (playtime: Playtime) => this.playtimeRemove(session, playtime),
      create: async () => {
        const sessionNew = await this.create(session.value);
        session.value = new Session({ game, isChallenge: false });
        return sessionNew;
      },
    };
  }

  useUpdate(sessionPassed: Session) {
    let session = ref(cloneDeep(sessionPassed));

    const playtimeNew = ref(new Playtime());

    return {
      entity: session,
      playtimeNew,
      playtimeAdd: () => ServiceSessionClass.playtimeAdd(session, playtimeNew),
      playtimeRemove: (playtime: Playtime) => this.playtimeRemove(session, playtime),
      update: async () => {
        session.value = cloneDeep(await this.update(session.value));
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

  async update(session: Session) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateSession,
      variables: {
        session: session.prepareForServer(),
      },
    });

    const sessionNew = await Session.parseFromServer(response.data.updateSession);

    queue.notify('updatedSession', sessionNew);

    return sessionNew;
  }

  async loadPage({ page, count, sortBy, sortDesc, filters }: InputCollection) {
    const response = await apolloClient.query({
      query: queryPageSession,
      variables: {
        page,
        count,
        sortBy,
        sortDesc,
        filters,
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
