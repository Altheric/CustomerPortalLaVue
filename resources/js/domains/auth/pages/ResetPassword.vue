<script setup lang="ts">
//Imports
import { computed } from 'vue';
import ResetForm from '../components/ResetForm.vue';
import { getCurrentRoute,getCurrentRouteToken } from 'services/router';
import type { ResetCreds } from '../types';
import { clearRequest, goToLoginPage, updatePassword } from '..';

//Refs
const token = computed(()=> getCurrentRouteToken());
const email = computed(()=> getCurrentRoute().value.params.email.toString());

//Functions
async function resetHandler(resetCreds: ResetCreds){
    const status = await updatePassword(resetCreds);
    if(status == 200){
        await clearRequest(resetCreds.email);
        goToLoginPage();
    }
}
</script>



<template>
    <ResetForm :email="email" :token="token" @submit="(resetCreds) => resetHandler(resetCreds)"/>
</template>