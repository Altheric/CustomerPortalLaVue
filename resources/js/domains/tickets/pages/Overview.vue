<script setup lang="ts">
//Imports
import { ref, computed } from 'vue';
import { ticketStore } from '..';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { getCurrentRouteId } from 'services/router';
import { getLoggedInUser } from 'domains/auth';
//Component Imports
import TicketView from '../components/TicketView.vue';
import SelectedView from '../components/SelectedView.vue';
import CategoryFilter from '../components/CategoryFilter.vue';
import AssignmentForm from '../components/AssignmentForm.vue';
import MessageOverview from 'domains/messages/components/MessageOverview.vue';
//Type Imports
import type { Ticket } from '../types';

//Store Setup
ticketStore.actions.getAll();
categoryStore.actions.getAll();
userStore.actions.getAdmins();

//Vars
const ticketGetters = ticketStore.getters;

//Refs
const user = ref(getLoggedInUser)
const filter = ref<number>(0);
const selection = ref<number>(0);
const admins = ref(userStore.getters.getAdmins.value)

const userID = computed<number | undefined>(() => {
    try{
        return getCurrentRouteId()
    } catch {
        return undefined
    }
})

const tickets = (category: number) => computed<Ticket[]>(() => {
    if (userID.value == user.value!.id) {
        if(user.value?.is_admin == true){
            return category == 0 ? ticketGetters.getAssignedTickets(userID.value!).value : ticketGetters.getAssignedTicketsByCategory(category, userID.value!).value;
        } else {
            return category == 0 ? ticketGetters.getUserTickets(userID.value!).value : ticketGetters.getUserTicketsByCategory(category, userID.value!).value;
        }
    } else {
        return category == 0 ? ticketGetters.all.value : ticketGetters.getTicketsByCategory(category).value;
    }
})

const ticket = (ticketID: number) => computed<Ticket>(() => ticketGetters.byId(ticketID).value)

//Functions
async function assignmentFormHandler(ticketStatus: {admin_id: number | null | undefined, status: string | null}){
    try{
        await ticketStore.actions.updateAssignment(selection.value, ticketStatus);
    } catch(error) {
        console.error(error)
    }
}
</script>

<template>
    <div v-if="user">
    <div v-if="!selection">
        <CategoryFilter @filter="(catFilter) => filter = catFilter"/>
        <TicketView :tickets="tickets(filter).value" @select="(ticketID) => selection = ticketID"/>
    </div>
    <div v-else>
        <SelectedView :ticket="ticket(selection).value" @revert="selection = 0"/>
        <MessageOverview :user="user" :admins="admins" :ticketID="selection"/>
        <AssignmentForm v-if="user!.is_admin" :admins="admins" :ticket="ticket(selection).value" @submit="(ticketStatus) => assignmentFormHandler(ticketStatus)"/>
    </div>
    </div>
</template>