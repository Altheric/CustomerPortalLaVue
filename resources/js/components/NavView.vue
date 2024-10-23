<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { logout, getLoggedInUser } from 'domains/auth';


const user = computed(() => getLoggedInUser.value!);

</script>

<template>
    <nav>
        <RouterLink to="/tickets" style="padding-right:20px;">Overzicht</RouterLink>
        <div v-if="user.is_admin" style="display: inline-block">
            <RouterLink :to="'/ticket/' + user!.id"  style="padding-right:20px;">Toegestuurde Tickets</RouterLink>
            <RouterLink to="/gebruikers"  style="padding-right:20px;">Gebruikers Beheren</RouterLink>
            <RouterLink to="/categorieen"  style="padding-right:20px;">Categorieen Beheren</RouterLink>
        </div>
        <div v-else style="display: inline-block">
            <RouterLink :to="'/ticket/' + user!.id"  style="padding-right:20px;">Bekijk Mijn Tickets</RouterLink>
            <RouterLink to="/ticket/toevoegen" style="padding-right:20px;">Nieuwe Ticket</RouterLink>
        </div>
        <a href="#" @click="logout()">Uitloggen</a>
    </nav>
    
</template>