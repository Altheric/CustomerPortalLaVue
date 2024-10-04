<script setup lang="ts">
//Imports
import { isLoggedIn } from '..';
import type { Credentials } from '../types';
import LoginForm from '../components/LoginForm.vue';
import { login, logout } from '..';
import { ref } from 'vue';

//Refs
const invalid = ref<boolean>(false)


//Functions
async function loginValidator(credentials: Credentials){
    const status = await login(credentials)
    if(status == 406){
        invalid.value = true;
    }
}
</script>



<template>
    <h1 v-if="isLoggedIn">Logged in!</h1>
    <button @click="logout()" v-if="isLoggedIn">Uitloggen</button>
    <LoginForm @submit="(loginCreds) => loginValidator(loginCreds)" v-else/>
    <p v-if="invalid" style="color:red;">Onjuiste email of wachtwoord</p>
</template>