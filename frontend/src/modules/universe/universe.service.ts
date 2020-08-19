import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import {
  mutationCreateUniverse,
  mutationDeleteUniverse,
  mutationUpdateUniverse,
} from '@/modules/universe/graphql/universe.graphql';
import { Universe } from '@/modules/universe/universe.model';
import { store } from '@/modules/app/app.store';
import { cloneDeep } from 'lodash';

export class ServiceUniverse {
  static useCreate() {
    let universe = ref(new Universe());

    return {
      universe,
      create: async () => {
        await ServiceUniverse.create(universe.value);
        universe.value = new Universe();
      },
    };
  }

  static useUpdate(universePassed: Universe) {
    let universe = ref(cloneDeep(universePassed));

    return {
      universe,
      update: async () => {
        universe.value = cloneDeep(await ServiceUniverse.update(universe.value));
      },
    };
  }

  static useDelete() {
    return {
      delete: (universe: Universe) => ServiceUniverse.delete(universe),
    };
  }

  static async create(universe: Universe) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateUniverse,
      variables: {
        universe,
      },
    });

    const universeNew = Universe.parseFromServer(response.data.createUniverse);
    store.commit('moduleUniverse/addUniverse', universeNew);

    return universeNew;
  }

  static async update(universe: Universe) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateUniverse,
      variables: {
        universe,
      },
    });

    const universeNew = Universe.parseFromServer(response.data.updateUniverse);
    store.commit('moduleUniverse/addUniverse', universeNew);

    return universeNew;
  }

  static async delete(universe: Universe) {
    await apolloClient.mutate({
      mutation: mutationDeleteUniverse,
      variables: {
        id: universe.id,
      },
    });

    store.commit('moduleUniverse/deleteUniverse', universe);
  }
}
