<script setup lang="ts">
//Imports
import { ref } from 'vue';
import type { Credentials } from '../types';

//Emits
const emit = defineEmits([
    'submit'
]);

//Functions
const loginCreds = ref<Credentials>({
    email: '',
    password: ''
})


function submit(){
    emit('submit', loginCreds.value);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-email">Email:</label>
        <input type="email" id="form-email" v-model="loginCreds.email" required min="3" max="60"><br>
        <label for="form-password">Wachtwoord:</label>
        <input type="password" id="form-password" v-model="loginCreds.password" required min="8" max="60"><br>
        <input type="submit" value="Log in">
    </form>
</template>