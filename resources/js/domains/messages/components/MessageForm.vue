<script setup lang="ts">
//Imports
import { computed, ref } from 'vue';
import type { Message } from '../types';
import type { SessionCreds } from 'domains/auth/types';

//Props
const props = defineProps<{
    actionType: string
    ticketID?: number
    user: SessionCreds
    message?: Message
}>()

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const submitType = computed<string>(() => props.actionType == 'response' ? 
    props.message? 'Update reactie' : 'Plaats reactie' : props.message? 'Update notitie' : 'Plaats notitie'
);

const message = ref({
    id: props.message ? props.message.id : 0,
    content: props.message? props.message.content : '',
    type: props.actionType,
    ticket_id: props.ticketID ? props.ticketID : props.message? props.message.ticket_id : 0,
    user_id: props.user.id
});

</script>

<template>
    <form @submit.prevent="$emit('submit', message)" :id="'admin-'+actionType+'-form'">
        <input type="text" id="form-text" v-model="message.content" required min="8"><br>
        <input type="submit" v-model="submitType">
    </form>
</template>