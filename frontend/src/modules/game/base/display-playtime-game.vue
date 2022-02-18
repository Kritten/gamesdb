<template>
    <template v-if="minutesPlaytimeMin !== null && minutesPlaytimeMax !== null">
        {{ infoPlaytime }}
    </template>
    <span v-else>{{ t('common.notSpecified') }}</span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { getValidator } from '@/modules/app/utilities/helpers';

export default defineComponent({
    name: 'DisplayPlaytimeGame',
    props: {
        minutesPlaytimeMin: {
            required: true,
            validator: getValidator({
                number: true,
                null: true,
            }),
        },
        minutesPlaytimeMax: {
            required: true,
            validator: getValidator({
                number: true,
                null: true,
            }),
        },
    },
    setup(props) {
        const { t } = useI18n();

        return {
            t,
            infoPlaytime: computed(() =>
                t(
                    'game.infoPlaytime',
                    {
                        minutesPlaytimeMin: props.minutesPlaytimeMin,
                        minutesPlaytimeMax: props.minutesPlaytimeMax,
                    },
                    props.minutesPlaytimeMin === props.minutesPlaytimeMax
                        ? 1
                        : 2
                )
            ),
        };
    },
});
</script>

<style scoped></style>
