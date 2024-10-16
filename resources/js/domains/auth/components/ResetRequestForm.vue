<script setup lang="ts">
//Imports
import { ref } from 'vue';

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const resetMail = ref<string>('');

//Functions
function submit(){
    const resetRequest: {email: string} = {
        email: resetMail.value
    }
    emit('submit', resetRequest);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-email">Email:</label>
        <input type="email" id="form-email" v-model="resetMail" required min="3" max="60"><br>

        <input type="submit" value="Wachtwoord Resetten">
    </form>
</template>