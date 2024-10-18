<script setup lang="ts">
//Imports
import { computed, ref } from 'vue';
import { categoryStore } from 'domains/category';
import { userStore } from 'domains/user';
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
const admins = computed(() => userStore.getters.getAdmins.value);

const actionType = ref<string>(props.actionType);
const ticketID = ref<number>(props.ticket.id);
const title = ref<string>(props.ticket.title);
const content = ref<string>(props.ticket.content);
const categoryID = ref<number>(props.ticket.category_id);
const userID = ref<number>(props.ticket.user_id);
const status = ref<string | null>(props.ticket.status);

//Functions
function submit(){
    const newTicket: Ticket = {
        id: ticketID.value,
        title: title.value,
        content: content.value,
        category_id: categoryID.value,
        user_id: userID.value,
        status: status.value
    }
    emit('submit', newTicket);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-title">Titel:</label>
        <input type="text" id="form-title" v-model="title" required min="3" max="60"><br>
        <label for="form-content">Uw Probleem:</label>
        <input type="text" id="form-content" v-model="content" required min="8" max="60"><br>
        <select v-model.number="categoryID" required>
            <option disabled value="">Kies een categorie</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.category }}</option>
        </select>
        <input type="submit" v-model="actionType">
    </form>
</template>