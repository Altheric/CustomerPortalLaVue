<script setup lang="ts">
//Imports
import { computed, ComputedRef } from 'vue';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { messageStore } from 'domains/messages';


//Props
const props =  defineProps<{
    ticketProp: ComputedRef
}>();


//Emits
const emit = defineEmits([
    'revert'
]);

//Refs
const ticket: ComputedRef = computed(() => props.ticketProp.value)

const selectedAdmin = (id: number) => computed(() => userStore.getters.byId(id).value)

const selectedCategory = (id: number) => computed(() => categoryStore.getters.byId(id).value)

const messages = (id: number, type: string) => computed(() => messageStore.getters.getMessagesByTnT(id, type).value)
</script>

<template>
    <a href="#" @click="$emit('revert')">Terug</a>
    <p>{{ ticket.title }}</p>
    <p>{{ ticket.user.name }}</p>
    <p>Gepost op: {{ ticket.created_at }} onder {{ selectedCategory(ticket.category_id).value.category }}</p>
    <p>{{ ticket.content }}</p>
    <p>In behandeling door: {{ selectedAdmin(ticket.admin_id).value.name }}</p>
    <p>Status: {{ ticket.status }}</p>
    <h2>Reacties</h2>
    <div>
        <div v-for="message in messages(ticket.id, 'response').value">
            <p>{{ selectedAdmin(message.user_id).value.name }}</p>
            <p>{{ message.content }}</p>
        </div>
    </div>
</template>