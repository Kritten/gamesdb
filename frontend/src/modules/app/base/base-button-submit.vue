<template>
    <q-btn
        color="primary"
        type="submit"
        :label="label"
        v-bind="options"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseButtonSubmit',
    props: {
        label: {
            required: true,
            type: String,
        },
        options: {
            required: false,
            type: Object,
            default: () => ({}),
        },
    },
});
</script>

<style scoped></style>
