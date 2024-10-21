//Imports
import {storeModuleFactory} from 'services/store';
import { computed } from 'vue';
import { createOverviewRoute, createEditRoute } from 'services/router/factory';
import { setTranslation } from 'services/translation';
//Component Imports
import OverviewPage from './pages/Overview.vue';
import EditPage from './pages/Edit.vue';
//Type Imports
import type { User } from './types';

//Vars
export const USER_VALID_ROLES = ['admin', 'user']

//Route Definition
export const USER_DOMAIN_NAME = 'users';

setTranslation(USER_DOMAIN_NAME, {
    singular: 'gebruiker',
    plural: 'gebruikers',
});


export const userRoutes = [
    createOverviewRoute(USER_DOMAIN_NAME, OverviewPage),
    createEditRoute(USER_DOMAIN_NAME, EditPage)
] 

//Store Definition
const baseUserStore = storeModuleFactory<User>(USER_DOMAIN_NAME);

export const userStore = {
    setters: baseUserStore.setters,
    actions:baseUserStore.actions,
    getters: {
        ...baseUserStore.getters,
        /** Get all user with the specified role from the store.*/
        getUsersByRole: (role: string) => computed<User[]>(() => Object.values(baseUserStore.state.value).filter((user) => user.role == role)),
    }
}