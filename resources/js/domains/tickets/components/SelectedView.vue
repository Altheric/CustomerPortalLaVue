<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { ticketStore } from '..';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { getLoggedInUser } from 'domains/auth';
import { goToEditPage } from 'services/router';
import { TICKET_DOMAIN_NAME } from '..';
import type { Ticket } from '../types';

//Props
const props =  defineProps<{
    ticketID: number
}>();


//Emits
const emit = defineEmits([
    'revert', 'assign'
]);

//Refs
const user = computed(() => getLoggedInUser.value)

const ticket = computed<Ticket>(() => ticketStore.getters.byId(props.ticketID).value)

const selectedAdmin = (id: number) => computed(() => userStore.getters.byId(id).value)

const selectedCategory = computed(() => categoryStore.getters.byId(ticket.value.category_id).value)


</script>

<template>
    <button @click="$emit('revert')">Terug</button>
    <button v-if="ticket.user_id == user?.id || user?.role == 'admin'" @click="goToEditPage(TICKET_DOMAIN_NAME, ticket.id)">Bewerken</button>
    <p>{{ ticket.title }}</p>
    <p>{{ ticket.user!.name }}</p>
    <p>Gepost op: {{ ticket.created_at }} onder {{ selectedCategory.category }}</p>
    <p>{{ ticket.content }}</p>
    <p v-if="ticket.admin_id">In behandeling door: {{ selectedAdmin(ticket.admin_id).value.name }}</p>
    <p v-else>Nog door niemand in behandeling.</p>
    <p>Status: {{ ticket.status }}</p>
</template>