import { Mood } from '@/modules/mood/mood.model';

interface StateInterface {
  moods: Mood[] | null;
}

export const moduleMood = {
  namespaced: true,
  state: {
    moods: null,
  },
  mutations: {
    setMoods(state: StateInterface, moods: Mood[]) {
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
