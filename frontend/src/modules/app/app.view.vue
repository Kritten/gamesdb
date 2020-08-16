<template>
  ViewApp
  <template v-if="$store.state.user !== null">
    {{ $store.state.user }}
  </template>
</template>

<script>
export default {
  name: 'ViewApp',
};
</script>

<style scoped></style>
