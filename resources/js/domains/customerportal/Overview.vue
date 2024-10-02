<script setup lang="ts">
//Imports
import { isLoggedIn } from '../../services/auth';




</script>

<template>
    <h1 v-if="isLoggedIn">Hello World!</h1>
    <h1 v-else>Please Login.</h1>
</template>