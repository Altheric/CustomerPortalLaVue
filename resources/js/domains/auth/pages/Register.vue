<script setup lang="ts">
//Imports
import type { NewCreds } from '../types';
import { ref } from 'vue';
import { register } from '..';
import { goToLoginPage } from '..';
import RegisterForm from '../components/RegisterForm.vue';

//Refs
const invalid = ref<boolean>(false)


//Functions
async function registerHandler(newUser: NewCreds){
    const status = await register(newUser);
    if(status == 200){
        goToLoginPage();
    }
}
</script>



<template>
    <RegisterForm @submit="(registerCreds) => registerHandler(registerCreds)"/>
</template>