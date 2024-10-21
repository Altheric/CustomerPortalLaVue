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
userStore.actions.getAll();
ticketStore.actions.getAll();
categoryStore.actions.getAll();


//Vars
const ticketGetters = ticketStore.getters;

//Refs
const user = computed(() => getLoggedInUser.value)
const filter = ref<number>(0);
const selection = ref<number>(0);
const admins = computed(() => userStore.getters.getUsersByRole('admin').value)

const userID = computed<number | undefined>(() => {
    try{
        return getCurrentRouteId()
    } catch {
        return undefined
    }
})

const tickets = (category: number) => computed<Ticket[]>(() => {
    if (userID.value == user.value?.id) {
        if(user.value?.role == 'admin'){
            return category == 0 ? ticketGetters.getAssignedTickets(userID.value!).value : ticketGetters.getAssignedTicketsByCategory(category, userID.value!).value;
        } else {
            return category == 0 ? ticketGetters.getUserTickets(userID.value!).value : ticketGetters.getUserTicketsByCategory(category, userID.value!).value;
        }
    } else {
        return category == 0 ? ticketGetters.all.value : ticketGetters.getTicketsByCategory(category).value;
    }
})


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
    <div v-if="!selection">
        <CategoryFilter @filter="(catFilter) => filter = catFilter"/>
        <TicketView :tickets="tickets(filter).value" @select="(ticketID) => selection = ticketID"/>
    </div>
    <div v-else>
        <SelectedView :ticketID="selection" @revert="selection = 0"/>
        <MessageOverview :user="user!" :ticketID="selection"/>
        <AssignmentForm v-if="user?.role == 'admin'" :admins="admins" :ticket="tickets(filter).value[0]" @submit="(ticketStatus) => assignmentFormHandler(ticketStatus)"/>

    </div>
</template>