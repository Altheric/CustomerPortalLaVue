<script setup lang="ts">
//Imports
import { ref, computed } from 'vue';
import { supportStore } from '..';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { messageStore } from 'domains/messages';
import TicketView from '../components/TicketView.vue';
import SelectedView from '../components/SelectedView.vue';
import CategoryFilter from '../components/CategoryFilter.vue';
import { getCurrentRouteId } from 'services/router';
import type { Ticket } from '../types';

userStore.actions.getAll();
supportStore.actions.getAll();
categoryStore.actions.getAll();
messageStore.actions.getAll();

//Refs
const filter = ref<number>(0);
const selection = ref<number>(0);

const userID = computed<number | undefined>(() => {
    try{
        return getCurrentRouteId()
    } catch {
        return undefined
    }
})

const tickets = (category: number) => computed<Ticket[]>(() => {
    if(category == 0 && userID.value){
        return supportStore.getters.getUserTickets(userID.value!).value
    } else if (userID.value) {
        return supportStore.getters.getUserTicketsByCategory(category, userID.value!).value
    } else if (category > 0 && !userID.value){
        return supportStore.getters.getTicketsByCategory(category).value
    } else {
        return supportStore.getters.all.value
    }
})
</script>

<template>
    <div v-if="!selection">
        <CategoryFilter @filter="(catFilter) => filter = catFilter"/>
        <TicketView :tickets="tickets(filter).value" @select="(ticketID) => selection = ticketID"/>
    </div>
    <SelectedView v-else :ticketID="selection" @revert="selection = 0"/>
</template>