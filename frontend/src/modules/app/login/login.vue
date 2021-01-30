<template>
  <el-container
    style="height: 100%"
  >
    <el-main>
      <el-row
        type="flex"
        align="middle"
        style="height: 100%"
      >
        <el-col>
          <el-row
            type="flex"
            justify="center"
          >
            <el-col
              :md="12"
              :lg="6"
            >
              <el-form
                @submit.native.prevent="loginService.login"
              >
                <base-input-text
                  v-model="loginService.username.value"
                  :options="{ label: t('login.name'), autofocus: true }"
                />
                <base-input-text
                  v-model="loginService.password.value"
                  :options="{ label: t('login.password'), type: 'password' }"
                />
                <base-button-submit :label="t('login.submit')" />
              </el-form>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ServiceLogin } from '@/modules/app/login/login.service';
import { useStore } from 'vuex';
import { defineComponent } from 'vue';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import BaseButtonSubmit from '@/modules/app/base/base-button-submit.vue';

export default defineComponent({
  name: 'Login',
  components: { BaseButtonSubmit, BaseInputText },
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
