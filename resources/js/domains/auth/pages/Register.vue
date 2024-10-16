<script setup lang="ts">
//Imports
import type { NewCreds } from '../types';
import { ref } from 'vue';
import { register } from '..';
import { goToLoginPage } from '..';
import RegisterForm from '../components/RegisterForm.vue';

//Refs
const dupeEmail = ref<boolean>(false)

//Functions
async function registerHandler(newUser: NewCreds){
    const status = await register(newUser);
    if(status == 200){
        goToLoginPage();
    } else {
        dupeEmail.value = true;
    }
}
</script>



<template>
    <RegisterForm @submit="(registerCreds) => registerHandler(registerCreds)"/>
    <p v-if="dupeEmail">Deze email bestaat al.</p>
</template>