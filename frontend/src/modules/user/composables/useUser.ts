import { ref } from 'vue';
import { User } from '@/modules/user/user.model';
import type { UserInterface } from '@/modules/user/user.types';

const user = ref<User | null | undefined>(undefined);

export const useUser = () => ({
    user,
    setUser(userPassed: UserInterface | null) {
        let result: User | null = null;

        if (userPassed !== null) {
            result = new User(userPassed);
        }

        user.value = result;
    },
});
