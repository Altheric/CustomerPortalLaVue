<script setup lang="ts">
//Imports
import { computed, ref } from 'vue';
import { categoryStore } from 'domains/category';
import type { Ticket } from '../types';

//Props
const props = defineProps<{
    ticket: Ticket
    actionType: string
}>()

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const categories = computed(() => categoryStore.getters.all.value);
const actionType = ref(props.actionType);
const ticket = ref({
    id: props.ticket.id,
    title: props.ticket.title,
    content: props.ticket.content,
    category_id: props.ticket.category_id,
    user_id: props.ticket.user_id,
    status: props.ticket.status
});
</script>

<template>
    <form @submit.prevent="$emit('submit', ticket)">
        <label for="form-title">Titel:</label>
        <input type="text" id="form-title" v-model="ticket.title" required min="3" max="60"><br>
        <label for="form-content">Uw Probleem:</label>
        <input type="text" id="form-content" v-model="ticket.content" required min="8" max="60"><br>
        <select v-model.number="ticket.category_id" required>
            <option disabled value="">Kies een categorie</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.category }}</option>
        </select>
        <input type="submit" v-model="actionType">
    </form>
</template>