<script setup lang="ts">
//Imports
import ResetRequestForm from '../components/ResetRequestForm.vue';

//Functions
async function resetRequestHandler(email: string){
    //Send an email I guess with the token???
}
</script>



<template>
    <ResetRequestForm @submit="(email) => resetRequestHandler(email)"/>
</template>