<script setup lang="ts">
//Imports

import { ref } from 'vue';
import { sendResetEmail } from '..';
import ResetRequestForm from '../components/ResetRequestForm.vue';

//Refs
const emailSent = ref<boolean>(false);
//Functions
async function resetRequestHandler(email: string){
    const status = sendResetEmail(email);


}
</script>



<template>
    <ResetRequestForm @submit="(email) => resetRequestHandler(email)"/>
    <p v-if="emailSent">Een mail om uw wachtwoord te veranderen is verzonden</p>
</template>