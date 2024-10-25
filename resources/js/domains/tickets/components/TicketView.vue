<script setup lang="ts">
//Imports
import { TICKET_DOMAIN_NAME } from '..';
import { getSingularTranslation } from 'services/translation';
import { RouterLink } from 'vue-router';
import type { Ticket } from '../types';


//Props
const props = defineProps<{
    tickets: Ticket[]
}>()

//Emits
const emit = defineEmits([
    'select'
]);

//Refs
</script>

<template>
    <p v-if="tickets.length < 1">Er zijn geen tickets.</p>
    <div v-for="ticket in tickets" :key="ticket.id">
        <RouterLink :to="`${getSingularTranslation(TICKET_DOMAIN_NAME)}/${ticket.id}`" class="overview-link">{{ ticket.title }}. Status: {{ ticket.status}}</RouterLink>
    </div>
</template>