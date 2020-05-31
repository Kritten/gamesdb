import { reactive, toRefs } from "vue";
import { ServiceApp } from "@/modules/app/app.service";

export class ServiceLogin {
  static useLogin() {
    const data = reactive({
      username: null,
      password: null
    });

    const login = async function() {
      // ServiceApp.login(data);
      console.warn(data.username, data.password);
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("password", data.password);
      const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/login`, {
        method: "POST",
        body: formData
      });
    };

    return {
      ...toRefs(data),
      login
    };
  }
}
