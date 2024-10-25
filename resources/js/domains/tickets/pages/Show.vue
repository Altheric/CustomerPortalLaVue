<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { getLoggedInUser } from 'domains/auth';
import { getCurrentRouteId, goToEditPage } from 'services/router';
import { TICKET_DOMAIN_NAME, ticketStore } from '..';
//Component Imports
import MessageOverview from 'domains/messages/components/MessageOverview.vue';
import AssignmentForm from '../components/AssignmentForm.vue';

//Refs
const ticket = ticketStore.getters.byId(getCurrentRouteId());
const currentUser = getLoggedInUser.value

const admins = userStore.getters.getAdmins.value;
userStore.actions.getById(ticket.value.user_id);
const user = userStore.getters.byId(ticket.value.user_id);

const selectedCategory = computed(() => categoryStore.getters.byId(ticket.value.category_id).value)

//Functions
async function assignmentFormHandler(ticketStatus: {admin_id: number | null | undefined, status: string | null}){
    await ticketStore.actions.updateAssignment(ticket.value.id, ticketStatus);
}
</script>

<template>
    <div v-if="user">
        <button v-if="ticket.user_id == currentUser!.id || currentUser!.is_admin == true" @click="goToEditPage(TICKET_DOMAIN_NAME, ticket.id)">Bewerken</button>
        <p>{{ ticket.title }}</p>
        <p>{{ user.name }}</p>
        <p>Gepost op: {{ ticket.created_at }} onder {{ selectedCategory.category }}</p>
        <p>{{ ticket.content }}</p>
        <p>Status: {{ ticket.status }}</p>
        <MessageOverview :user="currentUser!" :admins="admins" :ticketID="ticket.id"/>
        <AssignmentForm v-if="user!.is_admin" :admins="admins" :ticket="ticket" @submit="(ticketStatus) => assignmentFormHandler(ticketStatus)"/>
    </div>
</template>