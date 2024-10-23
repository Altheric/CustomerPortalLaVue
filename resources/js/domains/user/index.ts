//Imports
import {storeModuleFactory} from 'services/store';
import { computed } from 'vue';
import { createOverviewRoute, createEditRoute } from 'services/router/factory';
import { setTranslation } from 'services/translation';
import { getRequest } from 'services/http';
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
    actions: {
        ...baseUserStore.actions,
        /** Retrieve the admins from the database.*/
        getAdmins: async () => {
            const {data} = await getRequest(USER_DOMAIN_NAME + '/admins');
            if (!data) return;
            userStore.setters.setAll(data);
        }
    },
    getters: {
        ...baseUserStore.getters,
        /** Get all user that are admin from the store.*/
        getAdmins: computed<User[]>(() => Object.values(baseUserStore.state.value).filter((user) => user.is_admin == true)),
        /** Get all user that are users from the store.*/
        getUsers: computed<User[]>(() => Object.values(baseUserStore.state.value).filter((user) => user.is_admin == false)),
    }
}