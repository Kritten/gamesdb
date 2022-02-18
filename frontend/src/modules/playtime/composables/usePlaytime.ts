import { ref, Ref } from 'vue';
import { Playtime } from '@/modules/playtime/playtime.model';

const playtimeAdd = (
    playtimes: Ref<Array<Playtime>>,
    playtimeNew: Ref<Playtime>
) => {
    playtimes.value = [...playtimes.value, playtimeNew.value];
    playtimeNew.value = new Playtime();
};

const playtimeRemove = (
    playtimes: Ref<Array<Playtime>>,
    playtime: Playtime
) => {
    playtimes.value = playtimes.value.filter(
        (playtimeCurrent: Playtime) =>
            !(
                playtimeCurrent.start === playtime.start &&
                playtimeCurrent.end === playtime.end
            )
    );
};

export const usePlaytime = (playtimes: Ref<Array<Playtime>>) => {
    const playtimeNew = ref(new Playtime());

    return {
        playtimeNew,
        playtimeAdd: () => playtimeAdd(playtimes, playtimeNew),
        playtimeRemove: (playtime: Playtime) =>
            playtimeRemove(playtimes, playtime),
    };
};
