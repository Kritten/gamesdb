<template>
  {{login}}
  <form @submit.prevent="login.login">
    <div>
      <label for="name">{{ t('login.name') }}</label>
      <input
        id="name"
        v-model="login.username"
      >
    </div>
    <div>
      <label for="password">{{ t('login.password') }}</label>
      <input
        id="password"
        v-model="login.password"
      >
    </div>
    <div>
      <button type="submit">
        {{ t('login.submit') }}
      </button>
    </div>
  </form>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { ServiceLogin } from '@/modules/app/login/login.service';

export default {
  name: 'Login',
  setup() {
    const { t } = useI18n();
    const login = ServiceLogin.useLogin();

    return {
      login,
      t,
    };
  },
};
</script>

<style scoped>

</style>
