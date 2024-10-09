<script setup lang="ts">
//Imports
import { RouterLink } from 'vue-router';
import { logout, getLoggedInUser } from 'domains/auth';


const user = getLoggedInUser.value

</script>

<template>
    <nav>
        <RouterLink to="/overzicht" style="padding-right:20px;">Overzicht</RouterLink>
        <div v-if="user?.role == 'user'" style="display: inline-block">
            <RouterLink :to="'/overzicht/mijn-tickets/' + user?.id"  style="padding-right:20px;">Bekijk Mijn Tickets</RouterLink>
        </div>
        <a href="#" @click="logout()">Uitloggen</a>
    </nav>
    
</template>