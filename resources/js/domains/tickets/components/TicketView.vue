<script setup lang="ts">
//Imports
import { goToEditPage } from 'services/router';
import type { Ticket } from '../types';
import { TICKET_DOMAIN_NAME } from '..';

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
        <a href="#" class="overview-link" @click="$emit('select', ticket.id)">{{ ticket.title }}. Status: {{ ticket.status}}</a>
    </div>
</template>