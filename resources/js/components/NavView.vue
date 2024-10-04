<script setup lang="ts">
//Imports
import { RouterLink } from 'vue-router';
import { logout } from 'domains/auth';
</script>

<template>
    <nav>
        <RouterLink to="/" style="padding-right:20px;">Overview</RouterLink>
        <a href="#" @click="logout()">Uitloggen</a>
    </nav>
    
</template>