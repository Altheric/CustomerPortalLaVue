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
        <RouterLink :to="'/'+getPluralTranslation(TICKET_DOMAIN_NAME)">Overzicht</RouterLink>
        <template v-if="user.is_admin">
            <RouterLink :to="`/${getPluralTranslation(TICKET_DOMAIN_NAME)}/mijn-tickets/${user.id}`">Toegestuurde Tickets</RouterLink>
            <RouterLink :to="'/'+getPluralTranslation(USER_DOMAIN_NAME)">Gebruikers Beheren</RouterLink>
            <RouterLink :to="'/'+getPluralTranslation(CATEGORY_DOMAIN_NAME)">Categorieen Beheren</RouterLink>
        </template>
        <template v-else>
            <RouterLink :to="`/${getPluralTranslation(TICKET_DOMAIN_NAME)}/mijn-tickets/${user.id}`">Bekijk Mijn Tickets</RouterLink>
            <RouterLink :to="`/${getSingularTranslation(TICKET_DOMAIN_NAME)}/toevoegen`">Nieuwe Ticket</RouterLink>
        </template>
        <a href="#" @click="logout()">Uitloggen</a>
    </nav>
    
</template>