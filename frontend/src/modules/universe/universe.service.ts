import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
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
    const universe = ref(new Universe());

    return {
      entity: universe,
      create: async () => {
        const universeNew = await this.create(universe.value);
        universe.value = new Universe();
        return universeNew;
      },
    };
  }

  useUpdate(universePassed: Universe) {
    const universe = ref(cloneDeep(universePassed));

    return {
      entity: universe,
      update: async () => {
        universe.value = cloneDeep(await this.update(universe.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (universe: Universe) => this.delete(universe),
    };
  }

  async create(universe: Universe) {
    const { mutate } = useMutation(mutationCreateUniverse);
    const response = await mutate({
      variables: {
        universe,
      },
    });

    const universeNew = (await Universe.parseFromServer(response.data.createUniverse)) as Universe;
    store.commit('moduleUniverse/addUniverse', universeNew);

    return universeNew;
  }

  async update(universe: Universe) {
    const { mutate } = useMutation(mutationUpdateUniverse);
    const response = await mutate({
      variables: {
        universe,
      },
    });

    const universeNew = (await Universe.parseFromServer(response.data.updateUniverse)) as Universe;
    store.commit('moduleUniverse/addUniverse', universeNew);

    return universeNew;
  }

  async delete(universe: Universe) {
    const { mutate } = useMutation(mutationDeleteUniverse);
    const response = await mutate({
      variables: {
        id: universe.id,
      },
    });

    store.commit('moduleUniverse/deleteUniverse', universe);

    return response.data.deleteUniverse;
  }
}

export const ServiceUniverse = new ServiceUniverseClass();
