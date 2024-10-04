import {Credentials} from './types';
import { SUPPORT_DOMAIN_NAME } from 'domains/support';
import {UserResource} from 'domains/user/types';
import {computed, ref} from 'vue';
import {getRequest, postRequest, csrfRequest} from 'services/http';
import {goToOverviewPage, goToRoute, registerBeforeRouteMiddleware} from 'services/router';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import RequestResetPassword from './pages/RequestResetPassword.vue';
import ResetPassword from './pages/ResetPassword.vue';

export const authRoutes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {auth: false, canSeeWhenLoggedIn: false},
    },
    {
        path: '/wachtwoord-vergeten/:token/:email',
        name: 'resetPassword',
        component: ResetPassword,
        meta: {auth: false, canSeeWhenLoggedIn: false},
    },
    {
        path: '/wachtwoord-vergeten',
        name: 'forgotPassword',
        component: RequestResetPassword,
        meta: {auth: false, canSeeWhenLoggedIn: false},
    },
    {
        path: '/registreren/:token',
        name: 'register',
        component: Register,
        meta: {auth: false, canSeeWhenLoggedIn: false},
    },
];

const loggedInUser = ref<UserResource | null>(null);

export const isLoggedIn = computed(() => loggedInUser.value !== null);
export const getLoggedInUser = computed(() => loggedInUser.value);

export const login = async (credentials: Credentials) => {
    await csrfRequest()
    const data: any = await postRequest('login', credentials)
    console.log(data)
    if (!data) return;
    
    loggedInUser.value = data.user;
};

export const logout = async () => {
    await getRequest('logout');
    loggedInUser.value = null;
};

export const checkIfLoggedIn = async () => {
    const {data} = await getRequest('current-user')
    console.log(data);
    loggedInUser.value = data.user;
};

export const goToLoginPage = () => goToRoute('Login', undefined);

registerBeforeRouteMiddleware(({meta}) => {
    if (!isLoggedIn.value && meta?.auth) {
        goToLoginPage();
        return true;
    }
    if (isLoggedIn.value && !meta?.canSeeWhenLoggedIn) {
        goToOverviewPage(SUPPORT_DOMAIN_NAME);
        return true;
    }
    return false;
});