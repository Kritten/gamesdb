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
    let mechanism = ref(new Mechanism());

    return {
      entity: mechanism,
      create: async () => {
        const mechanismNew = await ServiceMechanism.create(mechanism.value);
        mechanism.value = new Mechanism();
        return mechanismNew;
      },
    };
  }

  useUpdate(mechanismPassed: Mechanism) {
    let mechanism = ref(cloneDeep(mechanismPassed));

    return {
      entity: mechanism,
      update: async () => {
        mechanism.value = cloneDeep(await ServiceMechanism.update(mechanism.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (mechanism: Mechanism) => ServiceMechanism.delete(mechanism),
    };
  }

  async create(mechanism: Mechanism) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateMechanism,
      variables: {
        mechanism,
      },
    });

    const mechanismNew = await Mechanism.parseFromServer(response.data.createMechanism);
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

    const mechanismNew = await Mechanism.parseFromServer(response.data.updateMechanism);
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
