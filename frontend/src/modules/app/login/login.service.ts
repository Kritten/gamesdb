import { reactive, toRefs } from "vue";
import { User } from "@/modules/user/user.model";
import { store } from "@/modules/app/app.store";
import { router } from "@/modules/app/app.router";

export class ServiceLogin {
  static useLogin() {
    const data = reactive({
      username: null,
      password: null
    });

    const login = async function() {
      const payload = {
        username: data.username,
        password: data.password
      };

      const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const user = new User(await response.json());
        console.warn(user, response, "response");
        await store.dispatch("setUser", user);

        await router.push({
          name: "dashboard"
        });
      }
    };

    return {
      ...toRefs(data),
      login
    };
  }
}
