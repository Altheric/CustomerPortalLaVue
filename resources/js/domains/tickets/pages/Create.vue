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
import { createTicket, TICKET_DOMAIN_NAME } from '..';
import { goToOverviewPage } from 'services/router';

//Stores Setup
userStore.actions.getAll();
ticketStore.actions.getAll();
categoryStore.actions.getAll();
messageStore.actions.getAll();

//Refs
const user = computed(() => getLoggedInUser.value)

//Vars
const newTicket: Ticket = {
    id: 0,
    title: '',
    content: '',
    status: 'unhandled',
    category_id: 0,
    admin_id: 0,
    user_id: user.value?.id!
}

//Functions
async function ticketCreateHandler(ticket: Ticket){
    const status = await createTicket(ticket);
    if(status == 200){
        goToOverviewPage(TICKET_DOMAIN_NAME)
    }
}
</script>

<template>
<TicketForm :ticket="newTicket" action-type="Verzend nieuwe ticket" @submit="(postTicket) => ticketCreateHandler(postTicket)"/>
</template>