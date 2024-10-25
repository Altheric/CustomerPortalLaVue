<script setup lang="ts">
//Imports
import { ref } from 'vue';

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const newUser= ref({
    name: '',
    email: '',
    password: '',
});
</script>

<template>
    <form @submit.prevent="$emit('submit', newUser)">
        <label for="form-username">Naam:</label>
        <input type="text" id="form-username" v-model="newUser.name" required min="3" max="60"><br>
        <label for="form-email">Email:</label>
        <input type="email" id="form-email" v-model="newUser.email" required min="3" max="60"><br>
        <label for="form-password">Wachtwoord:</label>
        <input type="password" id="form-password" v-model="newUser.password" required min="8" max="60"><br>
        <input type="submit" value="Maak een account aan">
    </form>
</template>