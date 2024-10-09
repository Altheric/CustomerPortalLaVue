import {storeModuleFactory} from 'services/store';
import { computed } from 'vue';
import type { User } from './types';
export const USER_DOMAIN_NAME = 'users';

const baseUserStore = storeModuleFactory<User>(USER_DOMAIN_NAME);

export const userStore = {
    setters: baseUserStore.setters,
    actions:baseUserStore.actions,
    getters: {
        ...baseUserStore.getters,
        /** Get all user with the Admin role from the store.*/
        getAdmins: computed(() => Object.values(baseUserStore.state.value).filter((user) => user.role == 'admin')),
    }
}