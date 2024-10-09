<script setup lang="ts">
//Imports
import { RouterLink } from 'vue-router';
import { logout } from 'domains/auth';
import { getCurrentRoute } from 'services/router';
</script>

<template>
    <nav>
        <RouterLink to="/overzicht" style="padding-right:20px;" v-if="!getCurrentRoute()">Overview</RouterLink>
        <a href="#" @click="logout()">Uitloggen</a>
    </nav>
    
</template>