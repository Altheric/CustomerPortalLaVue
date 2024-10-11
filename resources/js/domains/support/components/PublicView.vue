<script setup lang="ts">
//Imports
import { supportStore } from '..';
import { categoryStore } from 'domains/category';
import { computed, ref } from 'vue';
import type { Ticket } from '../types';

//Emits
const emit = defineEmits([
    'select'
]);

//Refs
const categoryFilter = ref<number>(0)

const tickets = computed(() => supportStore.getters.all.value);
const filteredTickets = (id: number) => computed<Ticket[]>(() => supportStore.getters.getTicketsByCategory(id).value)
const categories = computed(() => categoryStore.getters.all.value);


</script>

<template>
    <div id="overview-filter">
        <select v-model.number="categoryFilter">
            <option disabled value="">Kies een categorie</option>
            <option :value="0">Alles</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.category }}</option>
        </select>
    </div>
    <div v-if="!categoryFilter" v-for="ticket in tickets" :key="ticket.id">
        <a href="#" class="overview-link" @click="$emit('select', ticket.id)">{{ ticket.title }}. Status: {{ ticket.status}}</a>
    </div>
    <div v-if="categoryFilter > 0" v-for="ticket in filteredTickets(categoryFilter).value" :key="ticket.id">
        
        <a href="#" class="overview-link" @click="$emit('select', ticket.id)">{{ ticket.title }}. Status: {{ ticket.status}}</a>
    </div>
    <p v-if="categoryFilter > 0 && filteredTickets(categoryFilter).value.length == 0">Er zijn geen tickets in deze categorie.</p>
</template>