<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { getLoggedInUser } from 'domains/auth';
import TicketForm from '../components/TicketForm.vue';
import { userStore } from 'domains/user';
import { ticketStore } from '..';
import { categoryStore } from 'domains/category';
import { messageStore } from 'domains/messages';
import type { Ticket } from '../types';
import { updateTicket, TICKET_DOMAIN_NAME } from '..';
import { getCurrentRouteId, goToOverviewPage } from 'services/router';

//Edit route: ticket/:id/aanpassen

//Stores Setup
userStore.actions.getAll();
ticketStore.actions.getAll();
categoryStore.actions.getAll();
messageStore.actions.getAll();

//Refs
const ticket = computed(() => ticketStore.getters.byId(getCurrentRouteId()).value)

//Functions
async function ticketUpdateHandler(ticket: Ticket){
    const status = await updateTicket(ticket.id, ticket);
    if(status == 200){
        goToOverviewPage(TICKET_DOMAIN_NAME);
    }
}
</script>

<template>
<TicketForm :ticket="ticket" action-type="Update ticket" @submit="(putTicket) => ticketUpdateHandler(putTicket)"/>
</template>