<script setup lang="ts">
//Imports
import { TICKET_DOMAIN_NAME } from '..';
import { getSingularTranslation } from 'services/translation';
import { RouterLink } from 'vue-router';
import type { Ticket } from '../types';
import { goToShowPage } from 'services/router';


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
    <table v-else>
        <thead>
            <tr>
                <th>Ticket</th>
                <th>Status</th>
                <th><!--Actions--></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="ticket in tickets" :key="ticket.id">
                <td>{{ ticket.title }}</td>
                <td>{{ ticket.status}}</td>
                <td><button @click="goToShowPage(TICKET_DOMAIN_NAME, ticket.id)">Bekijk</button></td>
            </tr>             
        </tbody>
    </table>
</template>