<script setup lang="ts">
//Imports
import { ref } from 'vue';
import type { ResetCreds } from '../types';

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const resetEmail = ref<string>('');
const resetToken = ref<string>('');

//Functions
function submit(){
    const resetCreds: ResetCreds = {
        email: resetEmail.value,
        token: resetToken.value
    }
    emit('submit', resetCreds);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-email">Email:</label>
        <input type="email" id="form-email" v-model="resetEmail" required min="3" max="60"><br>
        <label for="form-token">Code:</label>
        <input type="password" id="form-token" v-model="resetToken" required min="3" max="60"><br>
        <input type="submit" value="Reset Wachtwoord">
    </form>
</template>