<script setup lang="ts">
//Imports
import { ref, computed } from 'vue';
import { ticketStore } from '..';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { messageStore } from 'domains/messages';
import TicketView from '../components/TicketView.vue';
import SelectedView from '../components/SelectedView.vue';
import CategoryFilter from '../components/CategoryFilter.vue';
import AssignmentForm from '../components/AssignmentForm.vue';
import MessageForm from 'domains/messages/components/MessageForm.vue';
import { getCurrentRouteId } from 'services/router';
import { getLoggedInUser } from 'domains/auth';
import type { Ticket } from '../types';
import type { Message } from 'domains/messages/types';

//Store Setup
userStore.actions.getAll();
ticketStore.actions.getAll();
categoryStore.actions.getAll();
messageStore.actions.getAll();

//Vars
const ticketGetters = ticketStore.getters;

//Refs
const user = computed(() => getLoggedInUser.value)
const filter = ref<number>(0);
const selection = ref<number>(0);
const admins = computed(() => userStore.getters.getAdmins.value)
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

async function messsageFormHandler(newMessage: Message){
    try{
        await messageStore.actions.create(newMessage);
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
        <div v-if="user?.role == 'admin'">
            <AssignmentForm :admins="admins" :ticket="tickets(filter).value[0]" @submit="(ticketStatus) => assignmentFormHandler(ticketStatus)" id="admin-assignment-form"/>
            <MessageForm :actionType="'response'" :ticketID="selection" :user="user" @submit="(response) => messsageFormHandler(response)" id="admin-response-form"/>
        </div>
    </div>
</template>