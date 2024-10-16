<script setup lang="ts">
//Imports
import { ref } from 'vue';
import type { ResetCreds } from '../types';

//Emits
const emit = defineEmits([
    'submit'
]);
//Props
const props = defineProps<{
    email: string
    token: string
}>()

//Refs
const resetPassword = ref<string>('');

//Functions
function submit(){
    const resetCreds: ResetCreds = {
        email: props.email,
        token: props.token,
        password: resetPassword.value
    }
    emit('submit', resetCreds);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-password">Nieuw Wachtwoord:</label>
        <input type="password" id="form-password" v-model="resetPassword" required min="8" max="60"><br>
        <input type="submit" value="Reset Wachtwoord">
    </form>
</template>