import { reactive, toRefs } from 'vue';
import { ServiceApp } from '@/modules/app/app.service';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { i18n } from '@/boot/i18n';

class ServiceLoginClass {
  useLogin() {
    const data = reactive({
      username: null,
      password: null,
    });

    const login = async function () {
      const payload = {
        username: data.username,
        password: data.password,
      };

      const response = await fetch(`${process.env.GRAPHQL_URI}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await ServiceApp.initialize();
      } else {
        Notify.create({
          message: i18n.global.t('login.wrongCredentials'),
          type: 'negative',
        });
      }
    };

    return {
      ...toRefs(data),
      login,
    };
  }

  useLogout() {
    const logout = async () => {
      const response = await fetch(`${process.env.GRAPHQL_URI}/logout`);

      if (response.ok) {
        await ServiceApp.setCurrentUser(null);

        const router = useRouter();
        void router.push({
          name: 'home',
        });
      }
    };

    return {
      logout,
    };
  }
}

export const ServiceLogin = new ServiceLoginClass();
