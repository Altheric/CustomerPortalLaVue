<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { logout, getLoggedInUser } from 'domains/auth';


const user = computed(() => getLoggedInUser.value);

</script>

<template>
    <nav>
        <RouterLink to="/overzicht" style="padding-right:20px;">Overzicht</RouterLink>
        <div v-if="user!.role == 'user'" style="display: inline-block">
            <RouterLink :to="'/overzicht/mijn-tickets/' + user!.id"  style="padding-right:20px;">Bekijk Mijn Tickets</RouterLink>
            <RouterLink to="/nieuwe-ticket" style="padding-right:20px;">Nieuwe Ticket</RouterLink>
        </div>
        <div v-if="user!.role == 'admin'" style="display: inline-block">
            
        </div>
        <a href="#" @click="logout()">Uitloggen</a>
    </nav>
    
</template>