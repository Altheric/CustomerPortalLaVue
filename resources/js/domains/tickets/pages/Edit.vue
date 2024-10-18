<script setup lang="ts">
//Imports
import { computed } from 'vue';
import TicketForm from '../components/TicketForm.vue';
import { userStore } from 'domains/user';
import { ticketStore } from '..';
import { categoryStore } from 'domains/category';
import { messageStore } from 'domains/messages';
import type { Ticket } from '../types';
import { TICKET_DOMAIN_NAME } from '..';
import { getCurrentRouteId, goToOverviewPage } from 'services/router';

//Stores Setup
userStore.actions.getAll();
ticketStore.actions.getAll();
categoryStore.actions.getAll();
messageStore.actions.getAll();

//Refs
const ticket = computed(() => ticketStore.getters.byId(getCurrentRouteId()).value)

//Functions
async function ticketUpdateHandler(ticket: Ticket){
    try{
        await ticketStore.actions.update(ticket.id, ticket);
        goToOverviewPage(TICKET_DOMAIN_NAME);
    } catch(error) {
        console.error(error)
    }
}
</script>

<template>
<TicketForm :ticket="ticket" action-type="Update ticket" @submit="(putTicket) => ticketUpdateHandler(putTicket)"/>
</template>