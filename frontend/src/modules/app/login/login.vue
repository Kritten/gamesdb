<template>
  <form @submit.prevent="loginService.login">
    <div>
      <label for="name">{{ t('login.name') }}</label>
      <input
        id="name"
        v-model="loginService.username.value"
        autofocus
      >
    </div>
    <div>
      <label for="password">{{ t('login.password') }}</label>
      <input
        id="password"
        v-model="loginService.password.value"
        type="password"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('login.submit') }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceLogin } from '@/modules/app/login/login.service';
import { useStore } from 'vuex';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const { t } = useI18n();
    const loginService = ServiceLogin.useLogin();

    return {
      loginService,
      t,
      store: useStore(),
    };
  },
});
</script>

<style scoped></style>
