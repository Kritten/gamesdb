import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import {
  mutationCreateMechanism,
  mutationDeleteMechanism,
  mutationUpdateMechanism,
} from '@/modules/mechanism/graphql/mechanism.graphql';
import { Mechanism } from '@/modules/mechanism/mechanism.model';
import { store } from '@/modules/app/app.store';
import { cloneDeep } from 'lodash';
import { ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';

class ServiceMechanismClass implements ServiceEntityInterface<Mechanism> {
  useCreate() {
    const mechanism = ref(new Mechanism());

    return {
      entity: mechanism,
      create: async () => {
        const mechanismNew = await this.create(mechanism.value);
        mechanism.value = new Mechanism();
        return mechanismNew;
      },
    };
  }

  useUpdate(mechanismPassed: Mechanism) {
    const mechanism = ref(cloneDeep(mechanismPassed));

    return {
      entity: mechanism,
      update: async () => {
        mechanism.value = cloneDeep(await this.update(mechanism.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (mechanism: Mechanism) => this.delete(mechanism),
    };
  }

  async create(mechanism: Mechanism) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateMechanism,
      variables: {
        mechanism,
      },
    });

    const mechanismNew = (await Mechanism.parseFromServer(
      response.data.createMechanism,
    )) as Mechanism;
    store.commit('moduleMechanism/addMechanism', mechanismNew);

    return mechanismNew;
  }

  async update(mechanism: Mechanism) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateMechanism,
      variables: {
        mechanism,
      },
    });

    const mechanismNew = (await Mechanism.parseFromServer(
      response.data.updateMechanism,
    )) as Mechanism;
    store.commit('moduleMechanism/addMechanism', mechanismNew);

    return mechanismNew;
  }

  async delete(mechanism: Mechanism) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteMechanism,
      variables: {
        id: mechanism.id,
      },
    });

    store.commit('moduleMechanism/deleteMechanism', mechanism);

    return response.data.deleteMechanism;
  }
}

export const ServiceMechanism = new ServiceMechanismClass();
