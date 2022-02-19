<template>
    <q-layout class="full-height">
        <q-page-container class="full-height q-pa-md">
            <div class="row items-center full-height">
                <div class="col">
                    <div class="row justify-center">
                        <div
                            id="wrapper-login"
                            class="col-12 col-lg-4 text-center"
                        >
                            <q-form @submit="loginService.login">
                                <base-input-text
                                    v-model="loginService.username.value"
                                    :options="{
                                        label: t('login.name'),
                                        autofocus: true,
                                        dense: false,
                                    }"
                                />
                                <base-input-text
                                    v-model="loginService.password.value"
                                    :options="{
                                        label: t('login.password'),
                                        type: 'password',
                                        dense: false,
                                    }"
                                />
                                <base-button-submit
                                    class="q-mt-md"
                                    :label="t('login.submit')"
                                />
                            </q-form>
                        </div>

                        <div class="col-12 q-mt-lg text-center">
                            Hier geht es zur&nbsp;
                            <base-link
                                :options="{
                                    to: { name: 'display-wishlist' },
                                }"
                            >
                                {{ t('wishlist.label') }}
                            </base-link>
                            &nbsp;oder zu unserer&nbsp;
                            <base-link
                                :options="{
                                    to: { name: 'display-games' },
                                }"
                            >
                                {{ t('login.gamesList', 2) }}
                            </base-link>
                        </div>
                    </div>
                </div>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
import { ServiceLogin } from '@/modules/app/login/login.service';
import BaseInputText from '@/modules/app/base/inputs/base-input-text.vue';
import BaseButtonSubmit from '@/modules/app/base/base-button-submit.vue';
import BaseLink from '@/modules/app/base/base-link.vue';

export default defineComponent({
    name: 'LoginForm',
    components: { BaseLink, BaseButtonSubmit, BaseInputText },
    setup() {
        const { t } = useI18n();
        const loginService = ServiceLogin.useLogin();

        return {
            loginService,
            t,
        };
    },
});
</script>

<style
    scoped
    lang="scss"
>
#wrapper-login {
    max-width: 700px;
}
</style>
