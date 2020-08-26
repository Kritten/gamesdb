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

export class ServiceMood {
  static useCreate() {
    let mood = ref(new Mood());

    return {
      mood,
      create: async () => {
        await ServiceMood.create(mood.value);
        mood.value = new Mood();
      },
    };
  }

  static useUpdate(moodPassed: Mood) {
    let mood = ref(cloneDeep(moodPassed));

    return {
      mood,
      update: async () => {
        mood.value = cloneDeep(await ServiceMood.update(mood.value));
      },
    };
  }

  static useDelete() {
    return {
      delete: (mood: Mood) => ServiceMood.delete(mood),
    };
  }

  static async create(mood: Mood) {
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

  static async update(mood: Mood) {
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

  static async delete(mood: Mood) {
    await apolloClient.mutate({
      mutation: mutationDeleteMood,
      variables: {
        id: mood.id,
      },
    });

    store.commit('moduleMood/deleteMood', mood);
  }
}
