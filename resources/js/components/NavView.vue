<script setup lang="ts">
//Imports
import { RouterLink } from 'vue-router';
import { logout } from 'domains/auth';
import type { SessionCreds } from 'domains/auth/types';
import { TICKET_DOMAIN_NAME } from 'domains/tickets';
import { USER_DOMAIN_NAME } from 'domains/user';
import { CATEGORY_DOMAIN_NAME } from 'domains/category';
import { getSingularTranslation, getPluralTranslation } from 'services/translation';
//Props
const props = defineProps<{
    user : SessionCreds
}>()

</script>

<template>
    <nav v-if="user">
        <RouterLink :to="'/'+getPluralTranslation(TICKET_DOMAIN_NAME)" style="padding-right:20px;">Overzicht</RouterLink>
        <div v-if="user.is_admin" style="display: inline-block">
            <RouterLink :to="`/${getPluralTranslation(TICKET_DOMAIN_NAME)}/mijn-tickets/${user.id}`"  style="padding-right:20px;">Toegestuurde Tickets</RouterLink>
            <RouterLink :to="'/'+getPluralTranslation(USER_DOMAIN_NAME)"  style="padding-right:20px;">Gebruikers Beheren</RouterLink>
            <RouterLink :to="'/'+getPluralTranslation(CATEGORY_DOMAIN_NAME)"  style="padding-right:20px;">Categorieen Beheren</RouterLink>
        </div>
        <div v-else style="display: inline-block">
            <RouterLink :to="`/${getPluralTranslation(TICKET_DOMAIN_NAME)}/mijn-tickets/${user.id}`"  style="padding-right:20px;">Bekijk Mijn Tickets</RouterLink>
            <RouterLink :to="`/${getSingularTranslation(TICKET_DOMAIN_NAME)}/toevoegen`" style="padding-right:20px;">Nieuwe Ticket</RouterLink>
        </div>
        <a href="#" @click="logout()">Uitloggen</a>
    </nav>
    
</template>