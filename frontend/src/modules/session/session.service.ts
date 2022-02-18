import { Ref, ref } from 'vue';
import { compareAsc } from 'date-fns';
import { Session } from '@/modules/session/session.model';
import {
  queryPageSession,
} from '@/modules/session/graphql/session.graphql';
import { Playtime } from '@/modules/playtime/playtime.model';
import {
  ServiceCollectionInterface,
  InputCollection, ServiceCollectionLoadPage,
} from '@/modules/app/utilities/collection/collection.types';
import { loadPageBase } from '@/modules/app/utilities/collection/collection';
import { useSession } from '@/modules/session/composables/useSession';
import { GameLoading } from '@/modules/game/game.types';
import { useCreateSession } from '@/modules/session/composables/useCreateSession';
import { useUpdateSession } from '@/modules/session/composables/useUpdateSession';

class ServiceSessionClass
implements ServiceCollectionInterface<Session> {
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

    void this.loadPage({
      count: 1,
      page: 1,
      sortBy: ['startMax'],
      sortDesc: [true],
      filters,
    }).then(({ items }) => {
      if (items.length > 0) {
        session.value = items[0];
        lastDate.value = session.value.playtimes.map((playtime) => playtime.end as Date).sort(compareAsc)[
          session.value.playtimes.length - 1
        ];
      }
    });

    return {
      session,
      lastDate,
    };
  }

  useTrackSession() {
    return {
      start: async (session: Ref<Session>, game: GameLoading | undefined) => {
        if (game !== undefined) {
          session.value.game = game;
        }

        if (session.value.game === undefined) return;

        session.value.isVirtual = true;
        const dateCurrent = new Date();
        session.value.playtimes.push(
          new Playtime({
            start: dateCurrent,
            end: null,
          }),
        );

        const { create } = useCreateSession({ valuesInitial: session.value });

        const sessionNew = await create();
        // TODO include event
        // const sessionNew = await this.create(session.value, { event: 'startedSessionVirtual' });
        session.value = new Session({ isChallenge: false });
        return sessionNew;
      },
      pause: async (session: Session) => {
        session.stop();

        const { update } = useUpdateSession(session);

        // TODO include event
        await update();
        // await this.update(session, { event: 'pausedSession' });
      },
      continue: async (session: Session) => {
        const dateCurrent = new Date();
        session.playtimes.push(
          new Playtime({
            start: dateCurrent,
            end: null,
          }),
        );
        const { update } = useUpdateSession(session);
        await update();
        // TODO include event
        // await this.update(session, { event: 'continuedSession' });
      },
      stop: async (session: Session) => {
        session.stop();
        session.isVirtual = false;
        const { update } = useUpdateSession(session);
        await update();
        // TODO include event
        // await this.update(session, { event: 'stoppedSession' });
      },
    };
  }

  async loadPage(data: InputCollection) {
    return loadPageBase<Session, {sessions: ServiceCollectionLoadPage<Session>}>({
      data,
      query: queryPageSession,
      parseResult: async (response) => ({
        items: await Promise.all(
          response.sessions.items.map((session: Session) => Session.parseFromServer(session)),
        ),
        count: response.sessions.count,
      }),
      after: ({ items }) => {
        const { setSession } = useSession();

        for (let i = 0; i < items.length; i += 1) {
          setSession(items[i]);
        }
      },
    });
  }
}

export const ServiceSession = new ServiceSessionClass();
