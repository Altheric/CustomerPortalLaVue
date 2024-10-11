<script setup lang="ts">
//Imports
import ResetRequestForm from '../components/ResetRequestForm.vue';

//Functions
async function resetHandler(email: string){
    //handle given token??
}
</script>



<template>
    <ResetRequestForm @submit="(email) => resetHandler(email)"/>
</template>