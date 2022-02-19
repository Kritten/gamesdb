import { reactive, toRefs } from 'vue';
import { Notify } from 'quasar';
import { ServiceApp } from '@/modules/app/app.service';
import { i18n } from '@/boot/i18n';
import { useRouter } from '@/router';
import { useUser } from '@/modules/user/composables/useUser';

class ServiceLoginClass {
    useLogin() {
        const data = reactive({
            username: null,
            password: null,
        });

        const login = async () => {
            const payload = {
                username: data.username,
                password: data.password,
            };

            const response = await fetch(
                `${process.env.GRAPHQL_URI ?? ''}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            );

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
            const response = await fetch(
                `${process.env.GRAPHQL_URI ?? ''}/logout`
            );

            if (response.ok) {
                const { setUser } = useUser();
                setUser(null);

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
