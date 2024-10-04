<script setup lang="ts">
//Imports
import { ref, Ref } from 'vue';
import type { Credentials } from '../types';

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const loginEmail: Ref<string> = ref('');
const loginPassword: Ref<string> = ref('');

//Functions
function submit(){
    const loginCreds: Credentials = {
        email: loginEmail.value,
        password: loginPassword.value
    };
    emit('submit', loginCreds);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="login-email">Email:</label>
        <input type="email" id="login-email" v-model="loginEmail" required min="3" max="60"><br>
        <label for="login-password">Wachtwoord:</label>
        <input type="password" id="login-password" v-model="loginPassword" required min="3" max="60"><br>
        <input type="submit" value="Log in">
    </form>
</template>