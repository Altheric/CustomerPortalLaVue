<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { supportStore } from '..';
import type { Ticket } from '../types';

//Props
const props = defineProps<{
    id: number
}>();

//Emits
const emit = defineEmits([
    'select'
]);

//Refs
const myTickets = computed<Ticket[]>(()=> supportStore.getters.getUserTickets(props.id).value);

</script>

<template>   
    <p v-if="myTickets.length < 1">U heeft geen tickets.</p>
    <div v-else v-for="ticket in myTickets">
        <a href="#" class="overview-link" @click="$emit('select', ticket.id)">{{ ticket.title }}. Status: {{ ticket.status}}</a>
    </div>
</template>