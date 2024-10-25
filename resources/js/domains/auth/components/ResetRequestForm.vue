<script setup lang="ts">
//Imports
import { ref } from 'vue';

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const resetRequest=ref({
    email: ''
});
</script>

<template>
    <form @submit.prevent="$emit('submit', resetRequest)">
        <label for="form-email">Email:</label>
        <input type="email" id="form-email" v-model="resetRequest.email" required min="3" max="60"><br>

        <input type="submit" value="Wachtwoord Resetten">
    </form>
</template>