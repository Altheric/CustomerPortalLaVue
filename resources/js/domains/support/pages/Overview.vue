<script setup lang="ts">
//Imports
import { supportStore } from '..';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { messageStore } from 'domains/messages';
import { computed, ref } from 'vue';
import SelectedView from '../components/SelectedView.vue';
import type { Ticket } from '../types';


userStore.actions.getAll();
supportStore.actions.getAll();
categoryStore.actions.getAll();
messageStore.actions.getAll();

//Props
const props = defineProps<{
    id: number
}>();
//Vars
let selection: number = 0;

//Refs
const categoryFilter = ref<number>(0)

const tickets = computed(() => supportStore.getters.all.value);
const selectedTicket = (id: number) => computed(() => supportStore.getters.byId(id).value)
const filteredTickets = (id: number) => computed<Ticket[]>(() => supportStore.getters.getTicketsByCategory(id).value)
const categories = computed(() => categoryStore.getters.all.value);


</script>

<template>
    <div id="overview-filter" v-if="!selection">
        <select v-model.number="categoryFilter">
            <option disabled value="">Kies een categorie</option>
            <option :value="0">Alles</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.category }}</option>
        </select>
    </div>
    <div v-if="!selection && !categoryFilter" v-for="ticket in tickets" :key="ticket.id">
        <a href="#" class="overview-link" @click="selection = ticket.id">{{ ticket.title }}. Status: {{ ticket.status}}</a>
    </div>
    <div v-if="!selection && categoryFilter > 0" v-for="ticket in filteredTickets(categoryFilter).value" :key="ticket.id">
        
        <a href="#" class="overview-link" @click="selection = ticket.id">{{ ticket.title }}. Status: {{ ticket.status}}</a>
    </div>
    <p v-if="categoryFilter > 0 && filteredTickets(categoryFilter).value.length == 0">Er zijn geen tickets in deze categorie.</p>
    
    <SelectedView :ticketProp="selectedTicket(selection)" @revert="selection = 0" v-if="selection > 0"></SelectedView>
</template>