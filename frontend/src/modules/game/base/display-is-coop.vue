<template>
    {{ text }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { displayIsCoop } from '@/modules/app/utilities/helpers';

export default defineComponent({
    name: 'DisplayIsCoop',
    props: {
        isCoop: {
            required: true,
            type: Boolean,
        },
    },
    setup(props) {
        return {
            text: displayIsCoop(props.isCoop),
        };
    },
});
</script>

<style scoped></style>
