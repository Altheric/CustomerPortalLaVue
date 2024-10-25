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
const resetCreds = ref({
    email: props.email,
    token: props.token,
    password: ''
})
</script>

<template>
    <form @submit.prevent="$emit('submit', resetCreds)">
        <label for="form-password">Nieuw Wachtwoord:</label>
        <input type="password" id="form-password" v-model="resetCreds.password" required min="8" max="60"><br>
        <input type="submit" value="Reset Wachtwoord">
    </form>
</template>