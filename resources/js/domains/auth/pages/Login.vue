<script setup lang="ts">
//Imports
import type { Credentials } from '../types';
import LoginForm from '../components/LoginForm.vue';
import { login } from '..';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { goToOverviewPage } from 'services/router';
import { TICKET_DOMAIN_NAME } from 'domains/tickets';

//Refs
const invalid = ref<boolean>(false)


//Functions
async function loginHandler(credentials: Credentials){
    const status = await login(credentials)
    if(status == 406){
        invalid.value = true;
    } else if(status == 200) {
        goToOverviewPage(TICKET_DOMAIN_NAME)
    }
}
</script>



<template>
    <RouterLink to="/registreren">Maak een account aan</RouterLink>
    <LoginForm @submit="(loginCreds) => loginHandler(loginCreds)"/>
    <RouterLink to="/wachtwoord-vergeten" v-if="invalid == true">Wachtwoord vergeten?</RouterLink>
</template>