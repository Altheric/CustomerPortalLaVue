import type {Credentials, NewCreds, ResetCreds} from './types';
import { TICKET_DOMAIN_NAME } from 'domains/tickets';
import {computed, ref} from 'vue';
import {getRequest, postRequest, csrfRequest, putRequest, deleteRequest} from 'services/http';
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
        path: '/registreren',
        name: 'register',
        component: Register,
        meta: {auth: false, canSeeWhenLoggedIn: false},
    },
];

const loggedInUser = ref<{id: number, is_admin: boolean} | null>(null);

export const isLoggedIn = computed(() => loggedInUser.value !== null);
export const getLoggedInUser = computed(() => loggedInUser.value);

export const login = async (credentials: Credentials): Promise<number> => {
    await csrfRequest()
    const {data} = await postRequest('login', credentials)
    
    loggedInUser.value = data.user;

    return data.status;
};

export const logout = async () => {
    await getRequest('logout');
    loggedInUser.value = null;
    goToLoginPage();
};

export const checkIfLoggedIn = async () => {
    const {data} = await getRequest('current-user')
    loggedInUser.value = data.user;
};

export const goToLoginPage = () => goToRoute('Login', undefined);

registerBeforeRouteMiddleware(({meta}) => {
    if (!isLoggedIn.value && meta?.auth) {
        goToLoginPage();
        return true;
    }
    if (isLoggedIn.value && !meta?.canSeeWhenLoggedIn) {
        goToOverviewPage(TICKET_DOMAIN_NAME);
        return true;
    }
    return false;
});

export async function register(newUser: NewCreds){
    await csrfRequest()
    const {data} = await postRequest('register', newUser)

    return data.status;
}

export async function sendResetEmail(email: string){
    await csrfRequest()
    const {data} = await postRequest('forgot-password', email)

    return data.status;
}
export async function updatePassword(resetCreds: ResetCreds){
    await csrfRequest()
    const {data} = await putRequest('update-password', resetCreds)

    return data.status;
}
export async function clearRequest(email: string){
    const {data} = await deleteRequest('clear-request/'+ email )

    return data.status;
}