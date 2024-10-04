<script setup lang="ts">
//Imports
import type { Credentials } from '../types';
import LoginForm from '../components/LoginForm.vue';
import { login } from '..';
import { ref } from 'vue';
import { goToOverviewPage } from 'services/router';
import { SUPPORT_DOMAIN_NAME } from 'domains/support';

//Refs
const invalid = ref<boolean>(false)


//Functions
async function loginHandler(credentials: Credentials){
    const status = await login(credentials)
    if(status == 406){
        invalid.value = true;
    } else if(status == 200) {
        goToOverviewPage(SUPPORT_DOMAIN_NAME)
    }
}
</script>



<template>
    <LoginForm @submit="(loginCreds) => loginHandler(loginCreds)"/>
    <p v-if="invalid" style="color:red;">Onjuiste email of wachtwoord</p>
</template>