<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { ticketStore } from '..';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { messageStore } from 'domains/messages';
import type { Ticket } from '../types';

//Props
const props =  defineProps<{
    ticketID: number
}>();


//Emits
const emit = defineEmits([
    'revert'
]);

//Refs
const ticket = computed<Ticket>(() => ticketStore.getters.byId(props.ticketID).value)

const selectedAdmin = (id: number) => computed(() => userStore.getters.byId(id).value)

const selectedCategory = computed(() => categoryStore.getters.byId(ticket.value.category_id).value)

const responses = computed(() => messageStore.getters.getMessagesByTnT(props.ticketID, 'response').value)
</script>

<template>
    <a href="#" @click="$emit('revert')">Terug</a>
    <p>{{ ticket.title }}</p>
    <p>{{ ticket.user!.name }}</p>
    <p>Gepost op: {{ ticket.created_at }} onder {{ selectedCategory.category }}</p>
    <p>{{ ticket.content }}</p>
    <p>In behandeling door: {{ selectedAdmin(ticket.admin_id).value.name }}</p>
    <p>Status: {{ ticket.status }}</p>
    <h2>Reacties</h2>
    <div>
        <div v-for="response in responses">
            <p>{{ selectedAdmin(response.user_id).value.name }}</p>
            <p>{{ response.content }}</p>
        </div>
    </div>
</template>