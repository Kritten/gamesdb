import { ref } from 'vue';
import { apolloClient } from '@/vue-apollo';
import {
  mutationCreateMood,
  mutationDeleteMood,
  mutationUpdateMood,
} from '@/modules/mood/graphql/mood.graphql';
import { Mood } from '@/modules/mood/mood.model';
import { store } from '@/modules/app/app.store';
import { cloneDeep } from 'lodash';
import { ServiceEntityInterface } from '@/modules/app/utilities/entity/entity.types';

class ServiceMoodClass implements ServiceEntityInterface<Mood> {
  useCreate() {
    let mood = ref(new Mood());

    return {
      entity: mood,
      create: async () => {
        const moodNew = await this.create(mood.value);
        mood.value = new Mood();
        return moodNew;
      },
    };
  }

  useUpdate(moodPassed: Mood) {
    let mood = ref(cloneDeep(moodPassed));

    return {
      entity: mood,
      update: async () => {
        mood.value = cloneDeep(await this.update(mood.value));
      },
    };
  }

  useDelete() {
    return {
      delete: (mood: Mood) => this.delete(mood),
    };
  }

  async create(mood: Mood) {
    const response = await apolloClient.mutate({
      mutation: mutationCreateMood,
      variables: {
        mood,
      },
    });

    const moodNew = await Mood.parseFromServer(response.data.createMood);
    store.commit('moduleMood/addMood', moodNew);

    return moodNew;
  }

  async update(mood: Mood) {
    const response = await apolloClient.mutate({
      mutation: mutationUpdateMood,
      variables: {
        mood,
      },
    });

    const moodNew = await Mood.parseFromServer(response.data.updateMood);
    store.commit('moduleMood/addMood', moodNew);

    return moodNew;
  }

  async delete(mood: Mood) {
    const response = await apolloClient.mutate({
      mutation: mutationDeleteMood,
      variables: {
        id: mood.id,
      },
    });

    store.commit('moduleMood/deleteMood', mood);

    return response.data.deleteMood;
  }
}

export const ServiceMood = new ServiceMoodClass();
