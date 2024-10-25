<script setup lang="ts">
//Imports
import { RouterLink } from 'vue-router';
import { logout } from 'domains/auth';
import type { SessionCreds } from 'domains/auth/types';

//Props
const props = defineProps<{
    user : SessionCreds
}>()

</script>

<template>
    <nav v-if="user">
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