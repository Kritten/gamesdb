<template>
    <q-layout>
        <q-page-container class="full-height q-pa-md">
            <div class="row justify-center">
                <div class="col-12 col-lg-8">
                    <div class="row q-col-gutter-md">
                        <div class="col-12">
                            <list-games
                                analog-only
                                reduced
                            />
                        </div>
                    </div>
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { required } from '@vuelidate/validators';
import { useGame } from '@/modules/game/composables/useGame';
import ListGames from '@/modules/game/list/list-games.vue';
import { useCreateGame } from '@/modules/game/composables/useCreateGame';

export default defineComponent({
    name: 'ViewDisplayGames',
    components: { ListGames },
    setup() {
        const { t } = useI18n();
        const { countTotalAnalog } = useGame();

        const validationRules = {
            name: {
                required,
            },
            countPlayersMin: {
                required,
            },
            countPlayersMax: {
                required,
            },
            minutesPlaytimeMin: {
                required,
            },
            minutesPlaytimeMax: {
                required,
            },
        };

        return {
            t,
            countTotalAnalog,
            validationRules,
            useCreateEntity: useCreateGame,
        };
    },
});
</script>

<style scoped></style>
