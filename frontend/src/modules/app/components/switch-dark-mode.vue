<template>
    <base-input-boolean
        v-model="isDarkMode"
        :options="{
            label: '',
            icon: 'fa fa-moon',
            color: 'dark',
        }"
    ></base-input-boolean>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import baseInputBoolean from '@/modules/app/base/inputs/base-input-boolean.vue';
import { useDarkMode } from '@/modules/app/composables/useDarkMode';

export default defineComponent({
    name: 'SwitchDarkMode',
    components: { baseInputBoolean },
    setup() {
        const { isDarkMode } = useDarkMode();

        return { isDarkMode };
    },
});
</script>
