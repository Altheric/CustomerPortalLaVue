<script setup lang="ts">
//Imports
import { computed, ref } from 'vue';
import { ticketStore } from '..';
import type { User } from 'domains/user/types';
import type { Ticket } from '../types';

//Props
const props = defineProps<{
    admins: User[]
    ticket: Ticket
}>()

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const admins = ref<User[]>(props.admins);

const status = ref<string| null>(props.ticket.status);
const adminID = ref<number | null | undefined>(props.ticket.admin_id);

//Functions
function submit(){
    const ticketStatus: {admin_id: number | null | undefined, status: string | null} = {
        admin_id: adminID.value,
        status: status.value
    };

    emit('submit', ticketStatus);
}
</script>

<template>
    <form @submit.prevent="submit" id="admin-assignment-form">
        <select v-model.number="adminID">
            <option disabled value="">Selecteer iemand om de ticket op te pakken.</option>
            <option v-for="admin in admins" :value="admin.id" :key="admin.id" >{{ admin.name }}</option>
        </select>
        <select v-model="status">
            <option disabled value="">Selecteer de status van de ticket</option>
            <option value="unhandled">Niet in behandeling</option>
            <option value="in progress">In behandeling</option>
            <option value="done">Afgehandeld</option>
        </select>
        <input type="submit" value="Update">
    </form>
</template>