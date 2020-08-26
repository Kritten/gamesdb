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

export class ServiceMechanism {
  static useCreate() {
    let mechanism = ref(new Mechanism());

    return {
      mechanism,
      create: async () => {
        await ServiceMechanism.create(mechanism.value);
        mechanism.value = new Mechanism();
      },
    };
  }

  static useUpdate(mechanismPassed: Mechanism) {
    let mechanism = ref(cloneDeep(mechanismPassed));

    return {
      mechanism,
      update: async () => {
        mechanism.value = cloneDeep(await ServiceMechanism.update(mechanism.value));
      },
    };
  }

  static useDelete() {
    return {
      delete: (mechanism: Mechanism) => ServiceMechanism.delete(mechanism),
    };
  }

  static async create(mechanism: Mechanism) {
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

  static async update(mechanism: Mechanism) {
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

  static async delete(mechanism: Mechanism) {
    await apolloClient.mutate({
      mutation: mutationDeleteMechanism,
      variables: {
        id: mechanism.id,
      },
    });

    store.commit('moduleMechanism/deleteMechanism', mechanism);
  }
}
