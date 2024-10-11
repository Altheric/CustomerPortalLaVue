<script setup lang="ts">
//Imports
import { ref } from 'vue';
import type { ResetCreds } from '../types';
//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const resetMail = ref<string>('');

//Functions
function submit(){
    const resetCreds: ResetCreds = {
        email: resetMail.value
    }
    emit('submit', resetCreds);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-email">Email:</label>
        <input type="email" id="form-email" v-model="resetMail" required min="3" max="60"><br>

        <input type="submit" value="Wachtwoord Resetten">
    </form>
</template>