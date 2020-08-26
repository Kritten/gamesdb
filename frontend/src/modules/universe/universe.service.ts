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
import { ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';

class ServiceUniverseClass implements ServiceEntityInterface<Universe> {
  useCreate() {
    let universe = ref(new Universe());

    return {
      entity: universe,
      create: async () => {
        const universeNew = await ServiceUniverse.create(universe.value);
        universe.value = new Universe();
        return universeNew;
      },
    };
  }

  useUpdate(universePassed: Universe) {
    let universe = ref(cloneDeep(universePassed));

    return {
      entity: universe,
      update: async () => {
        universe.value = cloneDeep(await ServiceUniverse.update(universe.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (universe: Universe) => ServiceUniverse.delete(universe),
    };
  }

  async create(universe: Universe) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateUniverse,
      variables: {
        universe,
      },
    });

    const universeNew = await Universe.parseFromServer(response.data.createUniverse);
    store.commit('moduleUniverse/addUniverse', universeNew);

    return universeNew;
  }

  async update(universe: Universe) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateUniverse,
      variables: {
        universe,
      },
    });

    const universeNew = await Universe.parseFromServer(response.data.updateUniverse);
    store.commit('moduleUniverse/addUniverse', universeNew);

    return universeNew;
  }

  async delete(universe: Universe) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteUniverse,
      variables: {
        id: universe.id,
      },
    });

    store.commit('moduleUniverse/deleteUniverse', universe);

    return response.data.deleteUniverse;
  }
}

export const ServiceUniverse = new ServiceUniverseClass();
