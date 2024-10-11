<script setup lang="ts">
//Imports
import { ref } from 'vue';
import type { Credentials } from '../types';

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const loginEmail = ref<string>('');
const loginPassword = ref<string>('');

//Functions
function submit(){
    const loginCreds: Credentials = {
        email: loginEmail.value,
        password: loginPassword.value
    }
    emit('submit', loginCreds);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-email">Email:</label>
        <input type="email" id="form-email" v-model="loginEmail" required min="3" max="60"><br>
        <label for="form-password">Wachtwoord:</label>
        <input type="password" id="form-password" v-model="loginPassword" required min="3" max="60"><br>
        <input type="submit" value="Log in">
    </form>
</template>