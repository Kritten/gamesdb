<template>
    <div class="row q-col-gutter-md">
        <div class="col-12">
            <input-select-game
                v-if="hideGame === false"
                :model-value="game"
                :validation="validation.game"
                @update:model-value="updateGame"
            />
        </div>
        <div class="col-12">
            <base-input-boolean
                v-model="isChallengeInternal"
                :options="{
                    label: t('session.isChallenge'),
                }"
            />
        </div>
        <div class="col-12">
            <base-input-text
                v-model="commentInternal"
                :validation="validation?.comment"
                :options="{
                    label: t('session.comment'),
                    autogrow: true,
                }"
            />
        </div>
        <div class="col-12">
            <input-select-player
                v-model="playersInternal"
                :validation="validation?.players"
            />
        </div>
        <div class="col-12">
            <input-select-player
                v-model="winnersInternal"
                :validation="validation?.winners"
                :options="{
                    label: t('winner.label', 2),
                    options: playersInternal,
                    useInput: false,
                    disable: playersInternal.length === 0,
                }"
            />
        </div>
        <div class="col-12">
            <q-markup-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            {{ t('playtime.label') }}
                        </th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(playtime, index) in playtimes"
                        :key="index"
                    >
                        <template v-if="playtime.end !== null">
                            <td>
                                <item-playtime
                                    v-model:start="playtime.start"
                                    v-model:end="playtime.end"
                                />
                            </td>
                            <td>
                                <q-btn
                                    flat
                                    color="negative"
                                    :label="`${t('playtime.label')} ${t(
                                        'common.delete'
                                    )}`"
                                    @click="playtimeRemove(playtime)"
                                />
                            </td>
                        </template>
                        <template v-else>
                            <td
                                colspan="2"
                                class="bg-info"
                            >
                                {{ t('playtime.pending') }}
                                <base-date-time :value="playtime.start" />
                            </td>
                        </template>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <item-playtime
                                v-model:start="playtimeNew.start"
                                v-model:end="playtimeNew.end"
                            />
                        </td>
                        <td
                            class="text-right"
                            style="width: 1px"
                        >
                            <q-btn
                                flat
                                :label="`${t('playtime.label')} ${t(
                                    'common.create'
                                )}`"
                                @click="playtimeAdd"
                            />
                        </td>
                    </tr>
                </tfoot>
            </q-markup-table>
        </div>
    </div>
    <div
        v-if="errorMessagePlaytimes !== ''"
        class="text-negative q-mt-sm error-playtimes"
    >
        {{ errorMessagePlaytimes }}
    </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { computed, defineComponent, PropType } from 'vue';
import { Validation } from '@vuelidate/core';
import {
    EmitFunction,
    translate,
    useModelWrapper,
} from '@/modules/app/utilities/helpers';
import { Game } from '@/modules/game/game.model';
import InputSelectGame from '@/modules/game/base/input-select-game.vue';
import InputSelectPlayer from '@/modules/player/base/input-select-player.vue';
import BaseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import ItemPlaytime from '@/modules/playtime/item-playtime.vue';
import { usePlaytime } from '@/modules/playtime/composables/usePlaytime';
import { Playtime } from '@/modules/playtime/playtime.model';
import { Player } from '@/modules/player/player.model';
import BaseDateTime from '@/modules/app/base/base-date-time.vue';

export default defineComponent({
    name: 'ItemSession',
    components: {
        BaseDateTime,
        ItemPlaytime,
        BaseInputText,
        BaseInputBoolean,
        InputSelectPlayer,
        InputSelectGame,
    },
    props: {
        game: {
            type: Object as PropType<Game>,
            required: false,
            default: undefined,
        },
        comment: {
            type: Object as PropType<string | null>,
            required: true,
        },
        isChallenge: {
            type: Boolean,
            required: true,
        },
        players: {
            type: Array as PropType<Array<unknown>>,
            required: true,
        },
        winners: {
            type: Array as PropType<Array<unknown>>,
            required: true,
        },
        playtimes: {
            type: Array as PropType<Array<unknown>>,
            required: true,
        },
        hideGame: {
            type: Boolean,
            required: false,
            default: false,
        },
        validation: {
            required: false,
            type: Object as PropType<Validation>,
            default: undefined,
        },
    },
    emits: ['update:game'],
    setup(props, { emit }) {
        const { t } = useI18n();

        const playtimesInternal = useModelWrapper<Array<Playtime>>({
            props,
            emit: emit as EmitFunction,
            name: 'playtimes',
        });

        const { playtimeNew, playtimeAdd, playtimeRemove } =
            usePlaytime(playtimesInternal);

        return {
            t,
            playersInternal: useModelWrapper<Array<Player>>({
                props,
                emit: emit as EmitFunction,
                name: 'players',
            }),
            winnersInternal: useModelWrapper<Array<Player>>({
                props,
                emit: emit as EmitFunction,
                name: 'winners',
            }),
            commentInternal: useModelWrapper<string>({
                props,
                emit: emit as EmitFunction,
                name: 'comment',
            }),
            isChallengeInternal: useModelWrapper<boolean>({
                props,
                emit: emit as EmitFunction,
                name: 'isChallenge',
            }),
            playtimesInternal,
            playtimeNew,
            playtimeAdd,
            playtimeRemove,
            updateGame(event: unknown) {
                emit('update:game', event);
            },
            errorMessagePlaytimes: computed(() => {
                if (
                    props.validation !== undefined &&
                    props.validation.playtimes?.$errors.length > 0
                ) {
                    return translate(
                        (props as { validation: Validation }).validation
                            .playtimes?.$errors[0],
                        t
                    ).$message;
                }
                return '';
            }),
        };
    },
});
</script>

<style scoped>
tfoot tr td {
    border-top-width: 3px;
}

.error-playtimes {
    font-size: 11px;
}
</style>
