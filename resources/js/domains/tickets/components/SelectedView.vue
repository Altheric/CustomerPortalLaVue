<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { getLoggedInUser } from 'domains/auth';
import { goToEditPage } from 'services/router';
import { TICKET_DOMAIN_NAME } from '..';
import type { Ticket } from '../types';


//Props
const props =  defineProps<{
    ticket: Ticket
}>();


//Emits
const emit = defineEmits([
    'revert', 'assign'
]);

//Store Setup
userStore.actions.getById(props.ticket.user_id);

//Refs
const currentUser = computed(() => getLoggedInUser.value)

const user = userStore.getters.byId(props.ticket.user_id);

const selectedCategory = computed(() => categoryStore.getters.byId(props.ticket.category_id).value)


</script>

<template>
    <div v-if="user">
        <button @click="$emit('revert')">Terug</button>
        <button v-if="ticket.user_id == currentUser!.id || currentUser!.is_admin == true" @click="goToEditPage(TICKET_DOMAIN_NAME, ticket.id)">Bewerken</button>
        <p>{{ ticket.title }}</p>
        <p>{{ user.name }}</p>
        <p>Gepost op: {{ ticket.created_at }} onder {{ selectedCategory.category }}</p>
        <p>{{ ticket.content }}</p>
        <p>Status: {{ ticket.status }}</p>
    </div>
</template>