<script setup lang="ts">
//Imports
import { ref } from 'vue';
import type { NewCreds } from '../types';

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const registerName = ref<string>('');
const registerEmail = ref<string>('');
const registerPassword = ref<string>('');

//Functions
function submit(){
    const newUser: NewCreds = {
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value,
    }
    emit('submit', newUser);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-username">Naam:</label>
        <input type="text" id="form-username" v-model="registerName" required min="3" max="60"><br>
        <label for="form-email">Email:</label>
        <input type="email" id="form-email" v-model="registerEmail" required min="3" max="60"><br>
        <label for="form-password">Wachtwoord:</label>
        <input type="password" id="form-password" v-model="registerPassword" required min="8" max="60"><br>
        <input type="submit" value="Maak een account aan">
    </form>
</template>