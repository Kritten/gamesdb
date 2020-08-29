import { Mood } from '@/modules/mood/mood.model';

interface StateInterface {
  moods: { [key: string]: Mood };
}

const state: StateInterface = {
  moods: {},
};

export const moduleMood = {
  namespaced: true,
  state,
  mutations: {
    setMoods(state: StateInterface, moods: { [key: string]: Mood }) {
      state.moods = moods;
    },
    addMood(state: StateInterface, mood: Mood) {
      if (state.moods !== null && mood.id !== undefined) {
        state.moods[mood.id] = mood;
      }
    },
    deleteMood(state: StateInterface, mood: Mood) {
      if (state.moods !== null && mood.id !== undefined) {
        delete state.moods[mood.id];
      }
    },
  },
};
