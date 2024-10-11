<script setup lang="ts">
//Imports
import { supportStore } from '..';
import { categoryStore } from 'domains/category';
import { computed, ref } from 'vue';
import type { Ticket } from '../types';

//Props
const props = defineProps<{
    tickets: Ticket[]
}>()

//Emits
const emit = defineEmits([
    'select'
]);
</script>

<template>
    <div v-for="ticket in tickets" :key="ticket.id">
        <a href="#" class="overview-link" @click="$emit('select', ticket.id)">{{ ticket.title }}. Status: {{ ticket.status}}</a>
    </div>
</template>