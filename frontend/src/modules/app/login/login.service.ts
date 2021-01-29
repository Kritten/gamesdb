import { reactive, toRefs } from 'vue';
import { ServiceApp } from '@/modules/app/app.service';
import { router } from '@/modules/app/app.router';

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

      const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await ServiceApp.initialize();
      }
    };

    return {
      ...toRefs(data),
      login,
    };
  }

  useLogout() {
    const logout = async () => {
      const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/logout`);

      if (response.ok) {
        await ServiceApp.setCurrentUser(null);

        router
          .push({
            name: 'home',
          })
          .then();
      }
    };

    return {
      logout,
    };
  }
}

export const ServiceLogin = new ServiceLoginClass();
